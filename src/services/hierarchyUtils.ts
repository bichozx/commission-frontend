/* eslint-disable @typescript-eslint/no-explicit-any */
import { Participant } from '@/types/hirerachy';

type BackendHierarchy = {
  current: any;
  uplines: any[];
};

export function buildHierarchy(data: BackendHierarchy): Participant[] {
  if (!data.current) return [];

  // 1️⃣ Crear root (current)
  const root: Participant = {
    id: data.current.id,
    name: data.current.name,
    email: data.current.email || '',
    totalCommission: data.current.totalEarned || 0,
    totalEarned: data.current.totalEarned || 0,
    level: data.current.level, // ✅ REAL
    parentId: data.current.parentId ?? undefined,
    children: [],
  };

  // 2️⃣ Iterar uplines SIN modificar level
  let parent = root;

  data.uplines.forEach((upline) => {
    const node: Participant = {
      id: upline.id,
      name: upline.name,
      email: upline.email || '',
      totalCommission: upline.totalEarned || 0,
      level: upline.level, // ✅ REAL desde backend
      totalEarned: upline.totalEarned || 0,
      parentId: upline.parentId ?? undefined,
      commissionPercentage: upline.commissionPercentage,
      totalEarnedFromYou: upline.totalEarnedFromYou,
      totalCommissionsFromYou: upline.totalCommissionsFromYou,
      children: [],
    };

    parent.children.push(node);
    parent = node;
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
