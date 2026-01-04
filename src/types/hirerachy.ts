// export interface Participant {
//   id: string;
//   name: string;
//   email: string;
//   level: number; // Nivel jerárquico
//   parentId?: string; // Id del afiliado superior
//   children?: Participant[]; // Subafiliados directos
//   totalCommission: number;
// }

// types/hierarchy.ts
export type Participant = {
  id: string;
  name: string;
  email: string;
  totalCommission: number;
  children: Participant[];
  level: number;
  parentId?: string;
  commissionPercentage?: number;
  totalEarnedFromYou?: number;
  totalCommissionsFromYou?: number;
};

export interface ParticipantCardProps {
  participant: Participant;
  onEdit?: () => void;
  compact?: boolean;
}
