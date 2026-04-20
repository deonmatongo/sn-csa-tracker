const stats = [
  { label: 'Duration', value: '4 wks', sub: '~10–14 hrs / week' },
  { label: 'Daily target', value: '1.5–2h', sub: '+ 4–5h weekends' },
  { label: 'Exam cost', value: '~1,160', sub: 'PLN · $300 USD' },
  { label: 'Mid B2B salary', value: '17,640', sub: 'PLN / month after cert', accent: true },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-4 gap-3 px-10 py-6 border-b border-[#1e2d47] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#111827] border border-[#1e2d47] rounded-[10px] px-5 py-4">
          <div className="font-mono text-[11px] text-[#4a5e7a] uppercase tracking-widest mb-1">{s.label}</div>
          <div className={`font-mono text-2xl font-bold leading-none ${s.accent ? 'text-[#00d4aa]' : 'text-[#e8edf5]'}`}>
            {s.value}
          </div>
          <div className="text-[11px] text-[#4a5e7a] mt-1">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
