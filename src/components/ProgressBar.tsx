'use client';

interface ProgressBarProps {
  done: number;
  total: number;
  pct: number;
}

export default function ProgressBar({ done, total, pct }: ProgressBarProps) {
  return (
    <div className="px-4 sm:px-6 md:px-10 pt-5 md:pt-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs text-[#8a9bb5] tracking-widest">OVERALL PROGRESS</span>
        <span className="font-mono text-sm font-bold text-[#00d4aa]">{done} / {total} tasks</span>
      </div>
      <div className="h-1.5 bg-[#1a2236] rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-[#00d4aa] to-[#0099ff] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
