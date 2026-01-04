// src/types/commission.ts
export interface Commission {
  id: string;
  amount: number;
  affiliateId: string;
  createdAt: string;
}

export interface LevelStats {
  count: number;
  totalAmount: number;
  percentage: number;
  description: string;
}

export interface CommissionsByLevel {
  totalCommissions: number;
  totalAmount: number;
  byLevel: {
    level1: LevelStats;
    level2: LevelStats;
    level3: LevelStats;
  };
}
