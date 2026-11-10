import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { validateMetadata } from './validate-metadata.mjs';

test('T02 元数据校验器测试套件', async (t) => {
  const rootDir = process.cwd();

  await t.test('1. 生产环境 23 个已标注章 142 节元数据全量校验通过（0 错误 0 警告）', () => {
    const result = validateMetadata({ rootDir });
    assert.equal(result.errors.length, 0, `期望 0 错误，实际发现 ${result.errors.length}：${JSON.stringify(result.errors)}`);
    assert.equal(result.summary.pilotChapters, 23);
    assert.equal(result.summary.totalPilotSections, 142);
    assert.equal(result.summary.coveredSections, 142);
    assert.equal(result.summary.warnings, 0);

    // Assert distributions
    assert.ok(result.distribution.difficulty.D1 >= 1, '应包含 D1');
    assert.ok(result.distribution.difficulty.D2 >= 1, '应包含 D2');
    assert.ok(result.distribution.difficulty.D3 >= 1, '应包含 D3');
    assert.ok(result.distribution.difficulty.D4 >= 1, '应包含 D4');
    assert.ok(result.distribution.priority.P0 >= 1, '应包含 P0');
    assert.ok(result.distribution.priority.P1 >= 1, '应包含 P1');
    assert.ok(result.distribution.priority.P2 >= 1, '应包含 P2');
    assert.ok(result.distribution.priority.P3 >= 1, '应包含 P3');
  });

  // Helper to run validator on a temporary mutated copy of c01.json
  function runWithMutatedC01(mutationFn) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'meta-test-'));
    try {
      const origMetaDir = path.join(rootDir, 'content', 'metadata');
      const tempMetaDir = path.join(tempDir, 'metadata');
      const tempChaptersDir = path.join(tempMetaDir, 'chapters');
      fs.mkdirSync(tempChaptersDir, { recursive: true });

      // Copy tags.json
      fs.copyFileSync(path.join(origMetaDir, 'tags.json'), path.join(tempMetaDir, 'tags.json'));

      // Copy all chapters
      for (const cid of ['c01', 'c08', 'c11', 'c33']) {
        const origFile = path.join(origMetaDir, 'chapters', `${cid}.json`);
        const targetFile = path.join(tempChaptersDir, `${cid}.json`);
        if (cid === 'c01') {
          const data = JSON.parse(fs.readFileSync(origFile, 'utf8'));
          mutationFn(data);
          fs.writeFileSync(targetFile, JSON.stringify(data, null, 2));
        } else {
          fs.copyFileSync(origFile, targetFile);
        }
      }

      return validateMetadata({
        rootDir,
        metadataDir: tempMetaDir,
        writeOutput: false
      });
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  await t.test('2. 错误捕获：缺节 (MISSING_SECTION)', () => {
    const result = runWithMutatedC01((data) => {
      delete data.sections['c01-s2'];
    });
    const err = result.errors.find(e => e.code === 'MISSING_SECTION');
    assert.ok(err, '应检测到 MISSING_SECTION 错误');
    assert.equal(err.sectionId, 'c01-s2');
  });

  await t.test('3. 错误捕获：非法枚举 (INVALID_DIFFICULTY / INVALID_PRIORITY)', () => {
    const result = runWithMutatedC01((data) => {
      data.sections['c01-s1'].difficulty = 'D9';
      data.sections['c01-s1'].priority = 'P9';
    });
    const diffErr = result.errors.find(e => e.code === 'INVALID_DIFFICULTY');
    const prioErr = result.errors.find(e => e.code === 'INVALID_PRIORITY');
    assert.ok(diffErr, '应检测到 INVALID_DIFFICULTY 错误');
    assert.ok(prioErr, '应检测到 INVALID_PRIORITY 错误');
  });

  await t.test('4. 错误捕获：先修不存在 (PREREQUISITE_NOT_FOUND)', () => {
    const result = runWithMutatedC01((data) => {
      data.sections['c01-s2'].prerequisites.push({ id: 'c99-s9', strength: 'required' });
    });
    const err = result.errors.find(e => e.code === 'PREREQUISITE_NOT_FOUND');
    assert.ok(err, '应检测到 PREREQUISITE_NOT_FOUND 错误');
  });

  await t.test('5. 错误捕获：先修未来节 (PREREQUISITE_FUTURE_SECTION)', () => {
    const result = runWithMutatedC01((data) => {
      data.sections['c01-s1'].prerequisites.push({ id: 'c01-s5', strength: 'required' });
    });
    const err = result.errors.find(e => e.code === 'PREREQUISITE_FUTURE_SECTION');
    assert.ok(err, '应检测到 PREREQUISITE_FUTURE_SECTION 错误');
    assert.equal(err.sectionId, 'c01-s1');
  });

  await t.test('6. 错误捕获：先修自环 (PREREQUISITE_SELF_LOOP)', () => {
    const result = runWithMutatedC01((data) => {
      data.sections['c01-s2'].prerequisites.push({ id: 'c01-s2', strength: 'required' });
    });
    const err = result.errors.find(e => e.code === 'PREREQUISITE_SELF_LOOP');
    assert.ok(err, '应检测到 PREREQUISITE_SELF_LOOP 错误');
    assert.equal(err.sectionId, 'c01-s2');
  });

  await t.test('7. 错误捕获：公式不存在 (FORMULA_NOT_FOUND)', () => {
    const result = runWithMutatedC01((data) => {
      data.sections['c01-s1'].keyFormulas.push('c01-eq-999.9');
    });
    const err = result.errors.find(e => e.code === 'FORMULA_NOT_FOUND');
    assert.ok(err, '应检测到 FORMULA_NOT_FOUND 错误');
  });

  await t.test('8. 错误捕获：非法分钟数 (INVALID_MINUTES)', () => {
    const result = runWithMutatedC01((data) => {
      data.sections['c01-s1'].minutes = 43; // not a multiple of 5
    });
    const err = result.errors.find(e => e.code === 'INVALID_MINUTES');
    assert.ok(err, '应检测到 INVALID_MINUTES 错误');
  });

  await t.test('9. 警告捕获：未登记标签 (UNREGISTERED_TAG)', () => {
    const result = runWithMutatedC01((data) => {
      data.sections['c01-s1'].tags.push('未登记新标签');
    });
    const warn = result.warnings.find(w => w.code === 'UNREGISTERED_TAG');
    assert.ok(warn, '应给出 UNREGISTERED_TAG 警告');
  });
});
