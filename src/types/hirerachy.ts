// types/hierarchy.ts
export type Participant = {
  id: string;
  name: string;
  email: string;
  totalCommission: number;
  children: Participant[];
  level: AffiliateLevel;
  parentId?: string;
  totalEarned: number;
  commissionPercentage?: number;
  totalEarnedFromYou?: number;
  totalCommissionsFromYou?: number;
};

export interface ParticipantCardProps {
  participant: Participant;
  onEdit?: () => void;
  compact?: boolean;
}
export type AffiliateLevel = 1 | 2 | 3;
