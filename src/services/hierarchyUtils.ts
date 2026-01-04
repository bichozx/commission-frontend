import { Participant } from '@/types/hirerachy';

// services/hierarchyUtils.ts
// type BackendHierarchy = {
//   current?: any;
//   [key: string]: any; // level1, level2, ...
// };

// export function buildHierarchy(data: BackendHierarchy): Participant[] {
//   const hierarchy: Participant[] = [];

//   // Si existe current, es el nodo raíz
//   if (data.current) {
//     const rootNode: Participant = {
//       id: data.current.id,
//       name: data.current.name,
//       email: data.current.email || '',
//       totalCommission: data.current.totalEarned || 0,
//       children: [],
//       level: data.current.level || 1,
//       parentId: undefined,
//     };

//     // Construimos la jerarquía de niveles
//     let currentParent = rootNode;

//     // Procesamos todos los niveles en orden (level1, level2, etc.)
//     for (let i = 1; i <= 10; i++) {
//       // Asume máximo 10 niveles
//       const levelKey = `level${i}`;
//       const levelData = data[levelKey];

//       if (!levelData) break;

//       const childNode: Participant = {
//         id: levelData.id,
//         name: levelData.name,
//         email: levelData.email || '',
//         totalCommission:
//           levelData.totalEarnedFromYou || levelData.totalEarned || 0,
//         children: [],
//         level: i + 1, // level1 es nivel 2 en la jerarquía, level2 es nivel 3, etc.
//         parentId: currentParent.id,
//       };

//       currentParent.children.push(childNode);
//       currentParent = childNode; // El siguiente nivel será hijo de este
//     }

//     hierarchy.push(rootNode);
//   }

//   return hierarchy;
// }

// src/services/hierarchyUtils.ts - Agrega esta función
/* eslint-disable @typescript-eslint/no-explicit-any */

type BackendHierarchy = {
  current?: any;
  [key: string]: any; // level1, level2, ...
};

export function buildHierarchy(data: BackendHierarchy): Participant[] {
  if (!data.current) return [];

  const rootLevel = data.current.level;

  const root: Participant = {
    id: data.current.id,
    name: data.current.name,
    email: '',
    totalCommission: data.current.totalEarned || 0,
    level: rootLevel,
    parentId: undefined,
    children: [],
  };

  let currentParent = root;
  let currentLevel = rootLevel;

  Object.keys(data)
    .filter((key) => key !== 'current')
    .sort() // level1, level2, level3...
    .forEach((key) => {
      const item = data[key];
      if (!item) return;

      currentLevel -= 1; // ⬇️ BAJA DE NIVEL

      const child: Participant = {
        id: item.id,
        name: item.name,
        email: item.email || '',
        totalCommission: item.totalEarnedFromYou || 0,
        level: currentLevel,
        parentId: currentParent.id,
        commissionPercentage: item.commissionPercentage,
        totalEarnedFromYou: item.totalEarnedFromYou,
        totalCommissionsFromYou: item.totalCommissionsFromYou,
        children: [],
      };

      currentParent.children.push(child);
      currentParent = child;
    });

  return [root];
}

export function flattenHierarchy(participants: Participant[]): Participant[] {
  const flatList: Participant[] = [];

  function traverse(node: Participant) {
    // Agregar el nodo actual
    flatList.push({
      ...node,
      children: [], // Vaciamos children para la lista plana
    });

    // Recorrer hijos
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  }

  // Recorrer todos los participantes raíz
  participants.forEach(traverse);

  return flatList;
}
