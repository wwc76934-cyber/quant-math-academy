/**
 * Quant Math Academy - Knowledge Association Graph Tests (T09)
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test, { describe } from 'node:test';
import { buildGraphData } from './build-graph.mjs';

const ROOT = process.cwd();
const GRAPH_JSON_PATH = path.join(ROOT, 'content', 'generated', 'site', 'graph.json');
const MANIFEST_PATH = path.join(ROOT, 'content', 'generated', 'site', 'graph-manifest.json');
const BOOK_PATH = path.join(ROOT, 'content', 'generated', 'site', 'book.json');
const METADATA_DIR = path.join(ROOT, 'content', 'metadata', 'chapters');

describe('T09 知识关系图构建器与校验测试套件', () => {
  const bookData = JSON.parse(fs.readFileSync(BOOK_PATH, 'utf8'));
  const metadataFiles = fs.readdirSync(METADATA_DIR).filter((f) => f.endsWith('.json'));
  const metadataList = metadataFiles.map((f) =>
    JSON.parse(fs.readFileSync(path.join(METADATA_DIR, f), 'utf8'))
  );

  test('1. 产物存在性与结构完整性', () => {
    assert.ok(fs.existsSync(GRAPH_JSON_PATH), 'graph.json 必须存在');
    assert.ok(fs.existsSync(MANIFEST_PATH), 'graph-manifest.json 必须存在');

    const graph = JSON.parse(fs.readFileSync(GRAPH_JSON_PATH, 'utf8'));
    assert.equal(graph.schemaVersion, 1);
    assert.ok(Array.isArray(graph.nodes));
    assert.ok(graph.nodeMap);
    assert.ok(Array.isArray(graph.prerequisiteEdges));
    assert.ok(Array.isArray(graph.relatedEdges));
    assert.ok(graph.incoming);
    assert.ok(graph.ancestors);
    assert.ok(graph.stats);

    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    assert.equal(manifest.totalNodes, 219);
    assert.equal(manifest.annotatedNodes, 128);
    assert.equal(manifest.unannotatedNodes, 91);
    assert.equal(manifest.prerequisiteEdges, 269);
    assert.equal(manifest.maxPrerequisiteDepth, 3);
    assert.deepEqual(manifest.warnings, []);
  });

  test('2. 节点总数严格为 219，128 个标注节点，覆盖全部 34 章', () => {
    const { graphJson } = buildGraphData(bookData, metadataList);

    assert.equal(graphJson.nodes.length, 219, '全书必须恰好有 219 个知识点节点');
    assert.equal(graphJson.stats.annotatedNodes, 128, '当前有 128 个已评审标注节点');
    assert.equal(graphJson.stats.unannotatedNodes, 91, '其余 91 个节点为未标注');

    // 校验每个节点字段
    const chapterIdSet = new Set();
    const annotatedChapterIds = [
      'c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20', 'c33'
    ];
    for (const node of graphJson.nodes) {
      assert.ok(node.id, '节点 id 必须存在');
      assert.ok(node.chapterId, '节点 chapterId 必须存在');
      assert.ok(node.number, '节点 number 必须存在');
      assert.ok(node.title, '节点 title 必须存在');
      chapterIdSet.add(node.chapterId);

      if (annotatedChapterIds.includes(node.chapterId)) {
        assert.equal(node.annotated, true, `${node.id} 应为已标注`);
        assert.ok(node.difficulty, `${node.id} 应有难度等级`);
        assert.ok(node.priority, `${node.id} 应有优先级`);
      } else {
        assert.equal(node.annotated, false, `${node.id} 应为未标注`);
        assert.equal(node.difficulty, null, `${node.id} 未标注时不伪造难度`);
        assert.equal(node.priority, null, `${node.id} 未标注时不伪造优先级`);
      }
    }

    assert.equal(chapterIdSet.size, 34, '必须覆盖全部 34 个章节');
  });

  test('3. 先修子图是严格 DAG（0 环）', () => {
    const { graphJson } = buildGraphData(bookData, metadataList);
    assert.equal(graphJson.stats.hasCycles, false);
    assert.equal(graphJson.stats.prerequisiteEdges, 269);
  });

  test('4. 环路检测：人为注入循环先修必须报错并输出环路路径', () => {
    const cyclicMetadata = JSON.parse(JSON.stringify(metadataList));
    // 注入 c01-s1 -> c01-s2 -> c01-s3 -> c01-s1 环路
    const c01 = cyclicMetadata.find((m) => m.chapterId === 'c01');
    c01.sections['c01-s1'].prerequisites = [{ id: 'c01-s3', strength: 'required' }];

    assert.throws(
      () => {
        buildGraphData(bookData, cyclicMetadata);
      },
      /Cycle detected in prerequisite graph:.*c01-s1/i,
      '环路应被检测到并抛出异常'
    );
  });

  test('5. 未知 ID 检测：引用不存在的 section ID 必须报错', () => {
    const badMetadata = JSON.parse(JSON.stringify(metadataList));
    const c01 = badMetadata.find((m) => m.chapterId === 'c01');
    c01.sections['c01-s1'].prerequisites = [{ id: 'c99-s99', strength: 'required' }];

    assert.throws(
      () => {
        buildGraphData(bookData, badMetadata);
      },
      /Unknown prerequisite section ID "c99-s99"/i,
      '未知 ID 应触发校验异常'
    );
  });

  test('6. 自指检测：自身引用自身必须报错', () => {
    const badMetadata = JSON.parse(JSON.stringify(metadataList));
    const c01 = badMetadata.find((m) => m.chapterId === 'c01');
    c01.sections['c01-s1'].prerequisites = [{ id: 'c01-s1', strength: 'required' }];

    assert.throws(
      () => {
        buildGraphData(bookData, badMetadata);
      },
      /Self-referencing prerequisite in section "c01-s1"/i,
      '自指先修应触发校验异常'
    );
  });

  test('7. 反向索引 (incoming) 一致性验证', () => {
    const { graphJson } = buildGraphData(bookData, metadataList);

    // 对于每条先修边 from -> to
    for (const edge of graphJson.prerequisiteEdges) {
      const inc = graphJson.incoming[edge.from];
      assert.ok(inc, `incoming 中必须包含 ${edge.from}`);
      const found = inc.prerequisites.some((p) => p.id === edge.to);
      assert.ok(found, `${edge.from} 的 incoming 先修引用必须包含 ${edge.to}`);
    }

    // 检查 c11-s1：它作为 c11-s2, c11-s3, c11-s4, c11-s5 的直接先修
    const c11s1Inc = graphJson.incoming['c11-s1'];
    assert.ok(c11s1Inc.prerequisites.length >= 4);
    assert.ok(c11s1Inc.count > 0);
  });

  test('8. 传递先修链 (ancestors) 计算验证（最多 3 层且去重）', () => {
    const { graphJson } = buildGraphData(bookData, metadataList);

    // c11-s4 (概率不等式):
    // 直接先修: c11-s1, c11-s2, c11-s3 (depth 1)
    // 间接先修 (depth 2): c09-s2, c10-s2, c02-s6
    const c11s4Ancestors = graphJson.ancestors['c11-s4'];
    assert.ok(c11s4Ancestors, 'c11-s4 必须有 ancestors 链');

    const depth1 = c11s4Ancestors.filter((a) => a.depth === 1).map((a) => a.id);
    assert.ok(depth1.includes('c11-s1'), 'depth 1 包含 c11-s1');
    assert.ok(depth1.includes('c11-s2'), 'depth 1 包含 c11-s2');
    assert.ok(depth1.includes('c11-s3'), 'depth 1 包含 c11-s3');

    const depth2 = c11s4Ancestors.filter((a) => a.depth === 2).map((a) => a.id);
    assert.ok(depth2.includes('c09-s2'), 'depth 2 包含 c09-s2 (c11-s1 的先修)');
    assert.ok(depth2.includes('c10-s2'), 'depth 2 包含 c10-s2 (c11-s1 的先修)');

    // 校验层级 <= 3
    for (const [secId, ancList] of Object.entries(graphJson.ancestors)) {
      for (const item of ancList) {
        assert.ok(item.depth >= 1 && item.depth <= 3, `${secId} 的 ancestor 深度必须在 1-3 之间`);
      }
      const ids = ancList.map((a) => a.id);
      const uniqueIds = new Set(ids);
      assert.equal(ids.length, uniqueIds.size, `${secId} 的 ancestors 链不能有重复 ID`);
    }
  });

  test('9. 未标注章节不生成虚假关联边', () => {
    const { graphJson } = buildGraphData(bookData, metadataList);

    // c21 是未标注章
    const c21s1 = graphJson.nodeMap['c21-s1'];
    assert.equal(c21s1.annotated, false);

    // c16-s1 不应有由其主动发出的先修边
    const c16Edges = graphJson.prerequisiteEdges.filter((e) => e.to === 'c21-s1');
    assert.equal(c16Edges.length, 0, '未标注节不生成入向先修边');
  });
});
