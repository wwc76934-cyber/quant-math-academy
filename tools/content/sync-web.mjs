/**
 * Quant Math Academy - Web Asset Sync (T03)
 * Copies content/generated/site into web/public/content if web exists.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const SITE_DIR = path.join(ROOT, 'content', 'generated', 'site');
const WEB_DIR = path.join(ROOT, 'web');
const WEB_TARGET_DIR = path.join(ROOT, 'web', 'public', 'content');

export function syncWeb(options = {}) {
  const siteDir = options.siteDir || SITE_DIR;
  const webDir = options.webDir || WEB_DIR;
  const targetDir = options.targetDir || WEB_TARGET_DIR;

  if (!fs.existsSync(webDir)) {
    console.log(`[content:sync] web/ 目录尚未创建，创建目标目录结构并跳过实际同步。`);
    fs.mkdirSync(targetDir, { recursive: true });
    return { synced: false, reason: 'web_not_found' };
  }

  if (!fs.existsSync(siteDir)) {
    console.warn(`[content:sync] content/generated/site 未找到，请先运行 content:build。`);
    return { synced: false, reason: 'site_not_found' };
  }

  console.log(`[content:sync] 正在同步 ${siteDir} -> ${targetDir}...`);
  fs.cpSync(siteDir, targetDir, { recursive: true });
  console.log(`[content:sync] 复制完成。`);
  return { synced: true };
}

// CLI execution
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  syncWeb();
}
