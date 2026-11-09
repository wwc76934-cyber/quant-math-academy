/**
 * Quant Math Academy - Knowledge Association Graph Builder (T09)
 *
 * Constructs content/generated/site/graph.json and graph-manifest.json from:
 *   - content/generated/site/book.json
 *   - content/metadata/chapters/*.json
 *
 * Validates:
 *   1. All referenced section IDs exist in book.json (219 sections)
 *   2. No self-referencing prerequisite or related links
 *   3. Prerequisite subgraph is a strict DAG (0 cycles)
 *   4. Undirected related edges deduplicated
 *   5. Transitive prerequisite chains (ancestors) computed up to 3 levels
 *   6. Reverse citations index (incoming) computed for every section
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const BOOK_PATH = path.join(ROOT, 'content', 'generated', 'site', 'book.json');
const METADATA_DIR = path.join(ROOT, 'content', 'metadata', 'chapters');
const OUTPUT_DIR = path.join(ROOT, 'content', 'generated', 'site');
const WEB_OUTPUT_DIR = path.join(ROOT, 'web', 'public', 'content');

/**
 * Builds and validates the knowledge association graph.
 * Exposed as a pure function for testing.
 */
export function buildGraphData(bookData, metadataList) {
  if (!bookData || !Array.isArray(bookData.chapters)) {
    throw new Error('Invalid bookData: chapters array is required');
  }

  // 1. Build index of all 219 sections
  const allSectionsMap = new Map();
  const chapterLookup = new Map();

  for (const chapter of bookData.chapters) {
    chapterLookup.set(chapter.id, {
      id: chapter.id,
      number: chapter.number,
      title: chapter.title,
      displayTitle: chapter.displayTitle || chapter.title,
    });

    for (const sec of chapter.sections || []) {
      allSectionsMap.set(sec.id, {
        id: sec.id,
        chapterId: chapter.id,
        number: sec.number,
        title: sec.title,
        chapterTitle: chapter.title,
        difficulty: sec.difficulty || null,
        priority: sec.priority || null,
      });
    }
  }

  const totalSections = allSectionsMap.size;

  // 2. Index metadata by section ID
  const sectionMetaMap = new Map();
  for (const meta of metadataList || []) {
    if (!meta || !meta.sections) continue;
    for (const [secId, s] of Object.entries(meta.sections)) {
      sectionMetaMap.set(secId, s);
    }
  }

  // 3. Construct nodes
  let annotatedCount = 0;
  const nodes = [];
  const nodeMap = {};

  for (const [secId, rawSec] of allSectionsMap.entries()) {
    const meta = sectionMetaMap.get(secId);
    const isAnnotated = Boolean(meta && meta.reviewed);

    if (isAnnotated) {
      annotatedCount++;
    }

    const node = {
      id: secId,
      chapterId: rawSec.chapterId,
      number: rawSec.number,
      title: rawSec.title,
      chapterTitle: rawSec.chapterTitle,
      difficulty: isAnnotated ? (meta.difficulty || rawSec.difficulty || null) : null,
      priority: isAnnotated ? (meta.priority || rawSec.priority || null) : null,
      annotated: isAnnotated,
    };

    nodes.push(node);
    nodeMap[secId] = node;
  }

  // 4. Collect and validate edges
  const prerequisiteEdges = [];
  const relatedPairSet = new Set();
  const relatedEdges = [];

  // Map for fast direct prerequisite lookup: secId -> [{ from, strength }]
  const directPrereqMap = new Map();
  // Map for fast direct related lookup: secId -> Set<string>
  const directRelatedMap = new Map();

  for (const secId of allSectionsMap.keys()) {
    directPrereqMap.set(secId, []);
    directRelatedMap.set(secId, new Set());
  }

  for (const [secId, meta] of sectionMetaMap.entries()) {
    if (!allSectionsMap.has(secId)) {
      throw new Error(`Metadata contains unknown section ID: "${secId}"`);
    }

    // Only process edges for reviewed/annotated sections
    if (!meta.reviewed) continue;

    // Prerequisites: { from, to: secId, strength }
    if (Array.isArray(meta.prerequisites)) {
      for (const p of meta.prerequisites) {
        const fromId = typeof p === 'string' ? p : p?.id;
        const strength = typeof p === 'string' ? 'required' : (p?.strength || 'required');

        if (!fromId) continue;

        if (!allSectionsMap.has(fromId)) {
          throw new Error(
            `Unknown prerequisite section ID "${fromId}" referenced in section "${secId}"`
          );
        }

        if (fromId === secId) {
          throw new Error(`Self-referencing prerequisite in section "${secId}"`);
        }

        prerequisiteEdges.push({
          from: fromId,
          to: secId,
          strength,
        });

        directPrereqMap.get(secId).push({ from: fromId, strength });
      }
    }

    // Related: undirected { a, b }
    if (Array.isArray(meta.related)) {
      for (const r of meta.related) {
        const relId = typeof r === 'string' ? r : r?.id;
        if (!relId) continue;

        if (!allSectionsMap.has(relId)) {
          throw new Error(
            `Unknown related section ID "${relId}" referenced in section "${secId}"`
          );
        }

        if (relId === secId) {
          throw new Error(`Self-referencing related edge in section "${secId}"`);
        }

        const [a, b] = [secId, relId].sort();
        const pairKey = `${a}::${b}`;

        if (!relatedPairSet.has(pairKey)) {
          relatedPairSet.add(pairKey);
          relatedEdges.push({ a, b });
        }

        directRelatedMap.get(secId).add(relId);
        directRelatedMap.get(relId).add(secId);
      }
    }
  }

  // 5. DAG & Cycle Detection on prerequisiteEdges
  // from -> to means "from is prerequisite of to"
  const adj = new Map();
  for (const secId of allSectionsMap.keys()) {
    adj.set(secId, []);
  }
  for (const edge of prerequisiteEdges) {
    adj.get(edge.from).push(edge.to);
  }

  const visitState = new Map(); // 0: unvisited, 1: visiting, 2: visited
  const cyclePath = [];

  function detectCycle(u, currentPath) {
    visitState.set(u, 1);
    currentPath.push(u);

    for (const v of adj.get(u) || []) {
      const state = visitState.get(v) || 0;
      if (state === 1) {
        // Cycle found
        const cycleStartIndex = currentPath.indexOf(v);
        const fullCycle = [...currentPath.slice(cycleStartIndex), v];
        throw new Error(`Cycle detected in prerequisite graph: ${fullCycle.join(' -> ')}`);
      }
      if (state === 0) {
        detectCycle(v, currentPath);
      }
    }

    currentPath.pop();
    visitState.set(u, 2);
  }

  for (const secId of allSectionsMap.keys()) {
    if ((visitState.get(secId) || 0) === 0) {
      detectCycle(secId, cyclePath);
    }
  }

  // 6. Transitive Ancestors Calculation (up to 3 levels)
  // For section X, ancestors are sections that X directly or indirectly requires.
  const ancestors = {};
  let maxDepthSeen = 0;

  for (const secId of allSectionsMap.keys()) {
    const list = [];
    const visited = new Set([secId]);

    // Level 1: direct prerequisites
    const level1 = directPrereqMap.get(secId) || [];
    const level1Ids = [];

    for (const p of level1) {
      if (!visited.has(p.from)) {
        visited.add(p.from);
        list.push({ id: p.from, depth: 1, strength: p.strength });
        level1Ids.push(p.from);
        if (maxDepthSeen < 1) maxDepthSeen = 1;
      }
    }

    // Level 2
    const level2Ids = [];
    for (const p1 of level1Ids) {
      const p2List = directPrereqMap.get(p1) || [];
      for (const p2 of p2List) {
        if (!visited.has(p2.from)) {
          visited.add(p2.from);
          list.push({ id: p2.from, depth: 2, strength: p2.strength });
          level2Ids.push(p2.from);
          if (maxDepthSeen < 2) maxDepthSeen = 2;
        }
      }
    }

    // Level 3
    for (const p2 of level2Ids) {
      const p3List = directPrereqMap.get(p2) || [];
      for (const p3 of p3List) {
        if (!visited.has(p3.from)) {
          visited.add(p3.from);
          list.push({ id: p3.from, depth: 3, strength: p3.strength });
          if (maxDepthSeen < 3) maxDepthSeen = 3;
        }
      }
    }

    ancestors[secId] = list;
  }

  // 7. Incoming Reverse Citations Index
  // Which sections cite this section as a prerequisite or related?
  const incoming = {};
  for (const secId of allSectionsMap.keys()) {
    incoming[secId] = {
      prerequisites: [], // sections that have secId as prerequisite
      related: [],       // sections related to secId
      count: 0,
    };
  }

  for (const edge of prerequisiteEdges) {
    // edge.from is prerequisite, edge.to is dependent
    incoming[edge.from].prerequisites.push({
      id: edge.to,
      strength: edge.strength,
    });
  }

  for (const [secId, relSet] of directRelatedMap.entries()) {
    incoming[secId].related = Array.from(relSet).sort();
  }

  for (const secId of allSectionsMap.keys()) {
    incoming[secId].count =
      incoming[secId].prerequisites.length + incoming[secId].related.length;
  }

  // 8. Chapter Coverage Statistics
  const chapterCoverage = [];
  for (const chapter of bookData.chapters) {
    const secCount = (chapter.sections || []).length;
    let chapAnnotated = 0;
    for (const s of chapter.sections || []) {
      if (nodeMap[s.id]?.annotated) {
        chapAnnotated++;
      }
    }
    chapterCoverage.push({
      chapterId: chapter.id,
      number: chapter.number,
      title: chapter.title,
      totalSections: secCount,
      annotatedSections: chapAnnotated,
      coveragePercent: secCount > 0 ? Math.round((chapAnnotated / secCount) * 100) : 0,
    });
  }

  const stats = {
    totalNodes: totalSections,
    annotatedNodes: annotatedCount,
    unannotatedNodes: totalSections - annotatedCount,
    prerequisiteEdges: prerequisiteEdges.length,
    relatedEdges: relatedEdges.length,
    maxPrerequisiteDepth: maxDepthSeen,
    hasCycles: false,
  };

  const graphJson = {
    schemaVersion: 1,
    stats,
    nodes,
    nodeMap,
    prerequisiteEdges,
    relatedEdges,
    incoming,
    ancestors,
    chapterCoverage,
  };

  const manifestJson = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    totalNodes: totalSections,
    annotatedNodes: annotatedCount,
    unannotatedNodes: totalSections - annotatedCount,
    prerequisiteEdges: prerequisiteEdges.length,
    relatedEdges: relatedEdges.length,
    maxPrerequisiteDepth: maxDepthSeen,
    warnings: [],
  };

  return { graphJson, manifestJson };
}

/**
 * Main build execution
 */
export async function buildGraph() {
  console.log('[build-graph] Loading book.json and metadata...');
  const bookRaw = fs.readFileSync(BOOK_PATH, 'utf8');
  const bookData = JSON.parse(bookRaw);

  const metadataFiles = fs.readdirSync(METADATA_DIR).filter((f) => f.endsWith('.json'));
  const metadataList = [];
  for (const f of metadataFiles) {
    const raw = fs.readFileSync(path.join(METADATA_DIR, f), 'utf8');
    metadataList.push(JSON.parse(raw));
  }

  console.log(`[build-graph] Processing ${metadataList.length} metadata files...`);
  const { graphJson, manifestJson } = buildGraphData(bookData, metadataList);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(WEB_OUTPUT_DIR, { recursive: true });

  const graphOutPath = path.join(OUTPUT_DIR, 'graph.json');
  const manifestOutPath = path.join(OUTPUT_DIR, 'graph-manifest.json');
  fs.writeFileSync(graphOutPath, JSON.stringify(graphJson, null, 2), 'utf8');
  fs.writeFileSync(manifestOutPath, JSON.stringify(manifestJson, null, 2), 'utf8');

  // Sync to web/public/content
  fs.copyFileSync(graphOutPath, path.join(WEB_OUTPUT_DIR, 'graph.json'));
  fs.copyFileSync(manifestOutPath, path.join(WEB_OUTPUT_DIR, 'graph-manifest.json'));

  const sizeKb = (Buffer.byteLength(JSON.stringify(graphJson)) / 1024).toFixed(1);
  console.log(`[build-graph] Success!`);
  console.log(`  - Nodes: ${graphJson.stats.totalNodes} (${graphJson.stats.annotatedNodes} annotated)`);
  console.log(`  - Prerequisite Edges: ${graphJson.stats.prerequisiteEdges}`);
  console.log(`  - Related Edges: ${graphJson.stats.relatedEdges} (undirected deduplicated)`);
  console.log(`  - Max Prerequisite Depth: ${graphJson.stats.maxPrerequisiteDepth}`);
  console.log(`  - Size: ${sizeKb} KB`);
  console.log(`  - Saved to: ${graphOutPath} and synced to web/public/content/`);

  return { graphJson, manifestJson };
}

// CLI runner
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
) {
  buildGraph().catch((err) => {
    console.error('[build-graph] Error:', err);
    process.exit(1);
  });
}
