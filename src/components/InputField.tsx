'use client';

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}

export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
