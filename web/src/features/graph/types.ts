/**
 * Quant Math Academy - Knowledge Graph Types (T09)
 */

export interface GraphNode {
  id: string;
  chapterId: string;
  number: string;
  title: string;
  chapterTitle: string;
  difficulty: 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | null;
  priority: 'P0' | 'P1' | 'P2' | 'P3' | null;
  annotated: boolean;
}

export interface PrerequisiteEdge {
  from: string;
  to: string;
  strength: 'required' | 'helpful';
}

export interface RelatedEdge {
  a: string;
  b: string;
}

export interface IncomingCitationPrereq {
  id: string;
  strength: 'required' | 'helpful';
}

export interface IncomingCitations {
  prerequisites: IncomingCitationPrereq[];
  related: string[];
  count: number;
}

export interface AncestorNode {
  id: string;
  depth: number;
  strength: 'required' | 'helpful';
}

export interface ChapterCoverage {
  chapterId: string;
  number: number;
  title: string;
  totalSections: number;
  annotatedSections: number;
  coveragePercent: number;
}

export interface GraphStats {
  totalNodes: number;
  annotatedNodes: number;
  unannotatedNodes: number;
  prerequisiteEdges: number;
  relatedEdges: number;
  maxPrerequisiteDepth: number;
  hasCycles: boolean;
}

export interface GraphData {
  schemaVersion: number;
  stats: GraphStats;
  nodes: GraphNode[];
  nodeMap: Record<string, GraphNode>;
  prerequisiteEdges: PrerequisiteEdge[];
  relatedEdges: RelatedEdge[];
  incoming: Record<string, IncomingCitations>;
  ancestors: Record<string, AncestorNode[]>;
  chapterCoverage: ChapterCoverage[];
}
