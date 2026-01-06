/* eslint-disable @typescript-eslint/no-explicit-any */
import { Affiliate } from '@/types/affiliate';
import { Participant } from '@/types/hirerachy';

/* ---------- Normalización ---------- */

export function normalizeAffiliate(a: any): Affiliate {
  const name = a.name?.trim() || a.user?.name || '';
  const email = a.email?.trim() || a.user?.email || '';

  return {
    id: a.id,
    userId: a.userId,
    level: a.level,
    totalEarned: Number(a.totalEarned ?? 0),
    commissionRate: Number(a.commissionRate ?? 0),
    status: a.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE',
    parentId: a.parentId,
    name,
    email,
    user: { name, email },
    children: Array.isArray(a.children) ? a.children : [],
  };
}

/* ---------- Affiliate → Participant ---------- */

export function affiliateToParticipant(
  affiliate: Affiliate,
  parentId?: string
): Participant {
  return {
    id: affiliate.id,
    name: affiliate.name ?? '',
    email: affiliate.email ?? '',
    level: affiliate.level,
    totalEarned: affiliate.totalEarned,
    totalCommission: affiliate.commissionRate ?? 0,
    parentId,
    children: [],
    affiliate,
  };
}
