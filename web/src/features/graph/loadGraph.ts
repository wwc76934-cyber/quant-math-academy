/**
 * Quant Math Academy - Graph Loader (T09)
 */

import { GraphData } from './types';

let cachedGraphPromise: Promise<GraphData> | null = null;

export function clearGraphCache() {
  cachedGraphPromise = null;
}

export async function loadGraph(): Promise<GraphData> {
  if (cachedGraphPromise) {
    return cachedGraphPromise;
  }

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  const url = `${baseUrl}content/graph.json`;

  cachedGraphPromise = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`加载知识关系图失败 (HTTP ${res.status}): ${url}`);
      }
      const data = (await res.json()) as GraphData;
      if (!data || !Array.isArray(data.nodes) || !data.stats) {
        throw new Error('知识关系图数据格式异常');
      }
      return data;
    } catch (err) {
      cachedGraphPromise = null;
      throw err;
    }
  })();

  return cachedGraphPromise;
}
