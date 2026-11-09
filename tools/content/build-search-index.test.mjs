import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { htmlToSearchText, extractEnvironmentHtml, buildSearchIndex } from './build-search-index.mjs';

test('T08 搜索索引构建器测试套件', async (t) => {
  const ROOT = process.cwd();
  const searchDir = path.join(ROOT, 'content', 'generated', 'site', 'search');
  const indexPath = path.join(searchDir, 'index.json');
  const manifestPath = path.join(searchDir, 'manifest.json');

  await t.test('1. htmlToSearchText 净化与公式术语提取', () => {
    const rawHtml = '<p>计算 <span class="math math-inline" data-latex="\\operatorname{Var}(X) = \\mathbb E[X^2] - (\\mathbb E[X])^2">Var</span> 与 SVD 分解。</p>';
    const { text, terms } = htmlToSearchText(rawHtml);

    assert.ok(text.includes('Var(X)'), '应该保留可读公式 Var(X)');
    assert.ok(text.includes('E[X'), '应该保留期望 E[X');
    assert.ok(!text.includes('<span'), '不应含有 HTML 标签');
    assert.ok(terms.includes('Var'), 'terms 应该提取 Var');
    assert.ok(terms.includes('SVD'), 'terms 应该提取 SVD');
  });

  await t.test('2. 索引产物存在且指标符合契约', () => {
    assert.ok(fs.existsSync(indexPath), 'index.json 应该存在');
    assert.ok(fs.existsSync(manifestPath), 'manifest.json 应该存在');

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.equal(manifest.totalDocuments, 2504, '总文档数应为 2,504');
    assert.equal(manifest.counts.sections, 219, '节数应为 219');
    assert.equal(manifest.counts.environments, 889, '环境数应为 889');
    assert.equal(manifest.counts.exercises, 698, '习题数应为 698');
    assert.equal(manifest.counts.solutions, 698, '解析数应为 698');
    assert.equal(manifest.chaptersCount, 34, '应覆盖 34 章');
    assert.ok(manifest.gzipByteSize < 1.5 * 1024 * 1024, 'gzip 大小应小于 1.5MB');
  });

  await t.test('3. 文档 ID 唯一性与 34 章覆盖校验', () => {
    const documents = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    assert.equal(documents.length, 2504, '文档列表应有 2,504 条');

    const ids = new Set();
    const chapters = new Set();

    for (const doc of documents) {
      assert.ok(doc.id, '文档必须有 id');
      assert.ok(!ids.has(doc.id), `文档 id 重复: ${doc.id}`);
      ids.add(doc.id);

      assert.ok(doc.title, `文档 ${doc.id} 必须有 title`);
      assert.ok(doc.anchor, `文档 ${doc.id} 必须有 anchor`);
      assert.ok(doc.chapterId, `文档 ${doc.id} 必须有 chapterId`);
      assert.ok(doc.type, `文档 ${doc.id} 必须有 type`);

      chapters.add(doc.chapterId);
    }

    assert.equal(chapters.size, 34, '应覆盖全部 34 章');
  });

  await t.test('4. 锚点在页面中存在性与关联性', () => {
    const documents = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const siteDir = path.join(ROOT, 'content', 'generated', 'site');

    // Sample inspect 50 docs across types
    const sampleDocs = [
      ...documents.filter(d => d.type === 'section').slice(0, 10),
      ...documents.filter(d => d.type === 'definition' || d.type === 'theorem').slice(0, 15),
      ...documents.filter(d => d.type === 'exercise').slice(0, 10),
      ...documents.filter(d => d.type === 'solution').slice(0, 10)
    ];

    for (const doc of sampleDocs) {
      if (doc.type === 'section') {
        const secHtmlPath = path.join(siteDir, 'sections', `${doc.sectionId}.html`);
        assert.ok(fs.existsSync(secHtmlPath), `节文件应存在: ${doc.sectionId}`);
      } else if (doc.type === 'exercise' || doc.type === 'solution') {
        const exPath = path.join(siteDir, 'exercises', `${doc.chapterId}.json`);
        assert.ok(fs.existsSync(exPath), `习题文件应存在: ${doc.chapterId}`);
      } else {
        const secHtml = fs.readFileSync(path.join(siteDir, 'sections', `${doc.sectionId}.html`), 'utf8');
        assert.ok(secHtml.includes(`id="${doc.anchor}"`), `环境锚点应在节 HTML 中: ${doc.anchor}`);
      }
    }
  });
});
