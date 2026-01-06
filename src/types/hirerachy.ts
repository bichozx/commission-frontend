import { Affiliate } from '@/services/affiliate';

// types/hierarchy.ts
export type Participant = {
  id: string;
  name: string;
  email: string;
  totalCommission: number;
  children: Participant[];
  level: number;
  parentId?: string;
  totalEarned: number;
  commissionPercentage?: number;
  totalEarnedFromYou?: number;
  totalCommissionsFromYou?: number;
  // types/hirerachy.ts

  affiliate?: Affiliate; // <-- agregamos aquí la relación
};

// Props para el UpdateAffiliateForm
export interface UpdateAffiliateFormProps {
  affiliate: Affiliate;
  onClose: () => void;
  onUpdated?: (updatedAffiliate: Affiliate) => void;
}

export type AffiliateLevel = 1 | 2 | 3;
