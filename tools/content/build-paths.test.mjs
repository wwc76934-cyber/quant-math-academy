/**
 * Quant Math Academy - Learning Paths Tests (T11)
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test, { describe } from 'node:test';
import { validateAndBuildPaths } from './build-paths.mjs';

const ROOT = process.cwd();
const PATHS_JSON_PATH = path.join(ROOT, 'content', 'generated', 'site', 'paths.json');
const BOOK_PATH = path.join(ROOT, 'content', 'generated', 'site', 'book.json');

describe('T11 学习路径数据校验与构建测试套件', () => {
  const book = JSON.parse(fs.readFileSync(BOOK_PATH, 'utf8'));
  const allBookSectionIds = new Set();
  for (const ch of book.chapters) {
    for (const s of ch.sections) {
      allBookSectionIds.add(s.id);
    }
  }

  test('1. 产物存在性与结构完整性（4 条路径：A/B/C/D）', () => {
    assert.ok(fs.existsSync(PATHS_JSON_PATH), 'paths.json 必须存在于 content/generated/site/');
    const data = JSON.parse(fs.readFileSync(PATHS_JSON_PATH, 'utf8'));
    assert.equal(data.schemaVersion, 1);
    assert.equal(data.paths.length, 4);

    const ids = data.paths.map((p) => p.id);
    assert.deepEqual(ids, ['internship', 'progression', 'research', 'free']);

    const codes = data.paths.map((p) => p.code);
    assert.deepEqual(codes, ['A', 'B', 'C', 'D']);
  });

  test('2. 路径 A（量化实习冲刺，8 周）结构与节合法性', () => {
    const data = JSON.parse(fs.readFileSync(PATHS_JSON_PATH, 'utf8'));
    const pathA = data.paths.find((p) => p.id === 'internship');
    assert.ok(pathA);
    assert.equal(pathA.code, 'A');
    assert.equal(pathA.weeks, 8);
    assert.equal(pathA.weeksPlan.length, 8);
    assert.ok(pathA.totalSections >= 50 && pathA.totalSections <= 65);
    assert.ok(pathA.checkpoints.length >= 2);

    for (const wp of pathA.weeksPlan) {
      assert.ok(wp.week >= 1 && wp.week <= 8);
      assert.ok(wp.theme && wp.outcome);
      assert.ok(wp.estimatedMinutes > 0);
      assert.ok(Array.isArray(wp.sectionIds) && wp.sectionIds.length > 0);
      for (const sid of wp.sectionIds) {
        assert.ok(allBookSectionIds.has(sid), `节 ${sid} 必须在 book.json 中`);
      }
    }
  });

  test('3. 路径 B（系统数学进阶，20 周）严格全量覆盖 219 节且无重复', () => {
    const data = JSON.parse(fs.readFileSync(PATHS_JSON_PATH, 'utf8'));
    const pathB = data.paths.find((p) => p.id === 'progression');
    assert.ok(pathB);
    assert.equal(pathB.code, 'B');
    assert.equal(pathB.weeks, 20);
    assert.equal(pathB.weeksPlan.length, 20);

    const collected = [];
    for (const wp of pathB.weeksPlan) {
      for (const sid of wp.sectionIds) {
        collected.push(sid);
      }
    }

    assert.equal(collected.length, 219, '路径 B 包含的节总数必须恰好为 219');
    const uniqueIds = new Set(collected);
    assert.equal(uniqueIds.size, 219, '路径 B 包含的 219 节不得重复');

    for (const sid of collected) {
      assert.ok(allBookSectionIds.has(sid), `节 ${sid} 必须在 book.json 中`);
    }
  });

  test('4. 路径 C（量化研究应用，14 周）结构与节合法性', () => {
    const data = JSON.parse(fs.readFileSync(PATHS_JSON_PATH, 'utf8'));
    const pathC = data.paths.find((p) => p.id === 'research');
    assert.ok(pathC);
    assert.equal(pathC.code, 'C');
    assert.equal(pathC.weeks, 14);
    assert.equal(pathC.weeksPlan.length, 14);
    assert.ok(pathC.totalSections >= 80 && pathC.totalSections <= 120);

    for (const wp of pathC.weeksPlan) {
      assert.ok(wp.week >= 1 && wp.week <= 14);
      assert.ok(wp.theme && wp.outcome);
      assert.ok(wp.estimatedMinutes > 0);
      for (const sid of wp.sectionIds) {
        assert.ok(allBookSectionIds.has(sid), `节 ${sid} 必须在 book.json 中`);
      }
    }
  });

  test('5. 路径 D（自由学习模式）空周计划契约', () => {
    const data = JSON.parse(fs.readFileSync(PATHS_JSON_PATH, 'utf8'));
    const pathD = data.paths.find((p) => p.id === 'free');
    assert.ok(pathD);
    assert.equal(pathD.code, 'D');
    assert.equal(pathD.weeks, 0);
    assert.deepEqual(pathD.weeksPlan, []);
    assert.ok(pathD.principles.length >= 2);
  });

  test('6. 错误捕获：引用不存在的 sectionId 必须报错', () => {
    const tempSource = path.join(ROOT, 'content', 'paths', 'paths.json');
    const original = JSON.parse(fs.readFileSync(tempSource, 'utf8'));
    const mutated = JSON.parse(JSON.stringify(original));
    mutated.paths[0].weeksPlan[0].sectionIds.push('c99-s99');

    const tempFile = path.join(ROOT, 'content', 'paths', 'temp-invalid-paths.json');
    fs.writeFileSync(tempFile, JSON.stringify(mutated, null, 2), 'utf8');

    try {
      assert.throws(
        () => {
          validateAndBuildPaths({ sourcePath: tempFile });
        },
        /unknown section ID: "c99-s99"/i
      );
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  });
});
