import { Participant } from '@/types/hirerachy';

interface Props {
  participant: Participant;
  level?: number;
  onEdit?: () => void;
}

export default function ParticipantCard({ participant, level = 0 }: Props) {
  return (
    <div className={`ml-${level * 6} p-4 border rounded bg-white shadow`}>
      <p className="font-bold">{participant.name}</p>
      <p className="text-sm text-gray-500">{participant.email}</p>
      <p className="text-sm text-green-600">
        Commission: ${participant.totalEarned}
      </p>
      <p className="text-sm text-green-600">Level: ${participant.level}</p>

      {(participant.children || []).length > 0 && (
        <div className="mt-2 space-y-2">
          {(participant.children || []).map((child) => (
            <ParticipantCard
              key={child.id}
              participant={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
