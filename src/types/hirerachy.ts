import { Affiliate } from '@/context/stores/affiliateStore';

// types/hierarchy.ts
export type Participant = {
  id: string;
  name: string;
  email: string;
  level: number;
  totalEarned: number;
  totalCommission: number;
  parentId?: string;
  children: Participant[];
  commissionPercentage?: number;
  totalEarnedFromYou?: number;
  totalCommissionsFromYou?: number;
  affiliate?: Affiliate; // ✅ children ya está tipado correctamente
};

// Props para el UpdateAffiliateForm
export interface UpdateAffiliateFormProps {
  affiliate: Affiliate;
  onClose: () => void;
  onUpdated?: (updatedAffiliate: Affiliate) => void;
}

export type AffiliateLevel = 1 | 2 | 3;
