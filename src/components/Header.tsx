'use client';

interface HeaderProps {
  overallPct: number;
}

export default function Header({ overallPct }: HeaderProps) {
  return (
    <header className="border-b border-[#1e2d47] px-4 sm:px-6 md:px-10 py-6 md:py-8 flex items-start justify-between gap-4 flex-wrap">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 bg-[rgba(0,212,170,0.1)] border border-[rgba(0,212,170,0.25)] rounded-full px-3 py-1 font-mono text-[10px] sm:text-[11px] text-[#00d4aa] tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse" />
          ServiceNow CSA · PK0-005
        </div>
        <h1 className="font-mono text-[1.25rem] sm:text-[1.6rem] md:text-[2rem] font-bold text-[#e8edf5] tracking-tight leading-tight mb-1">
          4-Week Study <span className="text-[#00d4aa]">Tracker</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#8a9bb5]">
          Certified System Administrator · 60 questions · 90 min · Pass at 70%
        </p>
      </div>
      <div className="flex items-center gap-3 mt-1 flex-shrink-0">
        <div className="text-right">
          <div className="font-mono text-[10px] sm:text-[11px] text-[#4a5e7a] mb-1">OVERALL</div>
          <div className="font-mono text-[1.5rem] sm:text-[2rem] font-bold text-[#00d4aa] leading-none">
            {overallPct}%
          </div>
        </div>
      </div>
    </header>
  );
}
