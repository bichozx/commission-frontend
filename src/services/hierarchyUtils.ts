/* eslint-disable @typescript-eslint/no-explicit-any */
import { Participant } from '@/types/hirerachy';

// services/hierarchyUtils.ts
type BackendHierarchy = {
  current?: any;
  [key: string]: any; // level1, level2, ...
};

export function buildHierarchy(data: BackendHierarchy): Participant[] {
  const hierarchy: Participant[] = [];

  // Si existe current, es el nodo raíz
  if (data.current) {
    const rootNode: Participant = {
      id: data.current.id,
      name: data.current.name,
      email: data.current.email || '',
      totalCommission: data.current.totalEarned || 0,
      children: [],
      level: data.current.level || 1,
      parentId: undefined,
    };

    // Construimos la jerarquía de niveles
    let currentParent = rootNode;

    // Procesamos todos los niveles en orden (level1, level2, etc.)
    for (let i = 1; i <= 10; i++) {
      // Asume máximo 10 niveles
      const levelKey = `level${i}`;
      const levelData = data[levelKey];

      if (!levelData) break;

      const childNode: Participant = {
        id: levelData.id,
        name: levelData.name,
        email: levelData.email || '',
        totalCommission:
          levelData.totalEarnedFromYou || levelData.totalEarned || 0,
        children: [],
        level: i + 1, // level1 es nivel 2 en la jerarquía, level2 es nivel 3, etc.
        parentId: currentParent.id,
      };

      currentParent.children.push(childNode);
      currentParent = childNode; // El siguiente nivel será hijo de este
    }

    hierarchy.push(rootNode);
  }

  return hierarchy;
}
