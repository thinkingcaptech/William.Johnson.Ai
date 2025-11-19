interface ElementalBadgeProps {
  element: 'ignis' | 'terra' | 'aer' | 'aqua';
  label: string;
}

export default function ElementalBadge({ element, label }: ElementalBadgeProps) {
  const colors = {
    ignis: 'text-orange-500 border-orange-500/30 bg-orange-900/10',
    terra: 'text-emerald-500 border-emerald-500/30 bg-emerald-900/10',
    aer: 'text-violet-500 border-violet-500/30 bg-violet-900/10',
    aqua: 'text-cyan-500 border-cyan-500/30 bg-cyan-900/10',
  };

  return (
    <div
      className={`inline-flex items-center px-4 py-1 rounded-full border ${colors[element]} backdrop-blur-md mb-6`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-3 bg-current"></span>
      <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
        {label}
      </span>
    </div>
  );
}
