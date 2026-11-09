/**
 * Quant Math Academy - Learning Paths Builder & Validator (T11)
 */

import fs from 'node:fs';
import path from 'node:path';

export function validateAndBuildPaths(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const bookPath = options.bookPath || path.join(rootDir, 'content', 'generated', 'site', 'book.json');
  const sourcePath = options.sourcePath || path.join(rootDir, 'content', 'paths', 'paths.json');
  const generatedPath = options.generatedPath || path.join(rootDir, 'content', 'generated', 'site', 'paths.json');
  const webPublicPath = options.webPublicPath || path.join(rootDir, 'web', 'public', 'content', 'paths.json');

  if (!fs.existsSync(bookPath)) {
    throw new Error(`book.json not found: ${bookPath}`);
  }
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`paths.json source not found: ${sourcePath}`);
  }

  const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
  const allSectionIds = new Set();
  const sectionTitleMap = new Map();
  for (const ch of book.chapters) {
    for (const sec of ch.sections) {
      allSectionIds.add(sec.id);
      sectionTitleMap.set(sec.id, sec.title);
    }
  }

  const pathsData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  if (pathsData.schemaVersion !== 1) {
    throw new Error(`schemaVersion must be 1, got ${pathsData.schemaVersion}`);
  }
  if (!Array.isArray(pathsData.paths) || pathsData.paths.length !== 4) {
    throw new Error(`paths array must contain exactly 4 paths, got ${pathsData.paths?.length}`);
  }

  const pathIds = new Set();
  const pathCodes = new Set();

  for (const p of pathsData.paths) {
    if (!p.id || !p.code || !p.title) {
      throw new Error(`Path missing required fields: ${JSON.stringify(p)}`);
    }
    if (pathIds.has(p.id)) {
      throw new Error(`Duplicate path id: ${p.id}`);
    }
    if (pathCodes.has(p.code)) {
      throw new Error(`Duplicate path code: ${p.code}`);
    }
    pathIds.add(p.id);
    pathCodes.add(p.code);

    if (p.id === 'free') {
      if (!Array.isArray(p.weeksPlan) || p.weeksPlan.length !== 0) {
        throw new Error(`Free mode weeksPlan must be an empty array`);
      }
      continue;
    }

    if (!Array.isArray(p.weeksPlan) || p.weeksPlan.length === 0) {
      throw new Error(`Path ${p.id} must have non-empty weeksPlan`);
    }
    if (p.weeksPlan.length !== p.weeks) {
      throw new Error(`Path ${p.id} weeks ${p.weeks} does not match weeksPlan length ${p.weeksPlan.length}`);
    }

    const pathSectionIds = new Set();
    let totalMinutes = 0;

    for (let i = 0; i < p.weeksPlan.length; i++) {
      const wp = p.weeksPlan[i];
      if (wp.week !== i + 1) {
        throw new Error(`Path ${p.id} week number out of sequence: expected ${i + 1}, got ${wp.week}`);
      }
      if (!Array.isArray(wp.sectionIds) || wp.sectionIds.length === 0) {
        throw new Error(`Path ${p.id} week ${wp.week} has no sectionIds`);
      }
      totalMinutes += wp.estimatedMinutes || 0;

      for (const sid of wp.sectionIds) {
        if (!allSectionIds.has(sid)) {
          throw new Error(`Path ${p.id} week ${wp.week} contains unknown section ID: "${sid}"`);
        }
        if (p.id === 'progression') {
          if (pathSectionIds.has(sid)) {
            throw new Error(`Path B progression contains duplicate section ID: "${sid}"`);
          }
        }
        pathSectionIds.add(sid);
      }
    }

    // Path B must cover all 219 sections
    if (p.id === 'progression') {
      if (pathSectionIds.size !== 219) {
        throw new Error(`Path B progression must cover all 219 sections, got ${pathSectionIds.size}`);
      }
    }

    p.totalSections = pathSectionIds.size;
    p.totalEstimatedMinutes = totalMinutes;
  }

  // Ensure directories exist
  fs.mkdirSync(path.dirname(generatedPath), { recursive: true });
  fs.mkdirSync(path.dirname(webPublicPath), { recursive: true });

  const outputContent = JSON.stringify(pathsData, null, 2) + '\n';
  fs.writeFileSync(generatedPath, outputContent, 'utf8');
  fs.writeFileSync(webPublicPath, outputContent, 'utf8');

  return {
    success: true,
    pathsCount: pathsData.paths.length,
    pathIds: [...pathIds],
  };
}

if (process.argv[1] && process.argv[1].endsWith('build-paths.mjs')) {
  try {
    const res = validateAndBuildPaths();
    console.log(`[build-paths] Successfully validated and built paths (${res.pathsCount} paths: ${res.pathIds.join(', ')})`);
  } catch (err) {
    console.error(`[build-paths] Validation failed:`, err.message);
    process.exit(1);
  }
}
