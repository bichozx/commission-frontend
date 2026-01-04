import { Commission } from '@/types/commission';

interface Props {
  commission: Commission;
}

export default function CommissionCard({ commission }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <p>
        <strong>ID:</strong> {commission.id}
      </p>
      <p>
        <strong>Amount:</strong> ${commission.amount}
      </p>
      <p>
        <strong>Affiliate ID:</strong> {commission.affiliateId}
      </p>
      <p>
        <strong>Created At:</strong>{' '}
        {new Date(commission.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
