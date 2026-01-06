import { Affiliate } from '@/types/affiliate';
import { Participant } from '@/types/hirerachy';
import { affiliateToParticipant } from '../../mapper/affiliate.mapper';

export function buildParticipantTree(
  affiliate: Affiliate,
  parentId?: string
): Participant {
  const node = affiliateToParticipant(affiliate, parentId);

  node.children = (affiliate.children || []).map((child) =>
    buildParticipantTree(child, node.id)
  );

  return node;
}

export function flattenParticipants(root: Participant): Participant[] {
  const result: Participant[] = [];

  const traverse = (node: Participant) => {
    result.push({ ...node, children: [] });
    node.children.forEach(traverse);
  };

  traverse(root);
  return result;
}
