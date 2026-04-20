'use client';

import { useState } from 'react';
import { Week, ColorKey } from '@/types';
import { taskKey } from '@/lib/useProgress';

const colorMap: Record<ColorKey, { badge: string; bar: string; border: string }> = {
  w1: {
    badge: 'bg-[rgba(0,212,170,0.12)] text-[#00d4aa] border-[rgba(0,212,170,0.2)]',
    bar: 'bg-[#00d4aa]',
    border: 'border-[rgba(0,212,170,0.25)]',
  },
  w2: {
    badge: 'bg-[rgba(0,153,255,0.12)] text-[#0099ff] border-[rgba(0,153,255,0.2)]',
    bar: 'bg-[#0099ff]',
    border: 'border-[rgba(0,153,255,0.25)]',
  },
  w3: {
    badge: 'bg-[rgba(245,158,11,0.12)] text-[#f59e0b] border-[rgba(245,158,11,0.2)]',
    bar: 'bg-[#f59e0b]',
    border: 'border-[rgba(245,158,11,0.25)]',
  },
  w4: {
    badge: 'bg-[rgba(239,68,68,0.12)] text-[#ef4444] border-[rgba(239,68,68,0.2)]',
    bar: 'bg-[#ef4444]',
    border: 'border-[rgba(239,68,68,0.25)]',
  },
};

const tagStyles: Record<string, string> = {
  hands: 'bg-[rgba(0,212,170,0.1)] text-[#00d4aa] border-[rgba(0,212,170,0.2)]',
  key: 'bg-[rgba(239,68,68,0.1)] text-[#f87171] border-[rgba(239,68,68,0.2)]',
  mock: 'bg-[rgba(0,153,255,0.1)] text-[#0099ff] border-[rgba(0,153,255,0.2)]',
  free: 'bg-[rgba(245,158,11,0.1)] text-[#f59e0b] border-[rgba(245,158,11,0.2)]',
};

const tagLabels: Record<string, string> = {
  hands: 'hands-on',
  key: 'key topic',
  mock: 'mock exam',
  free: 'free',
};

interface WeekCardProps {
  week: Week;
  weekIndex: number;
  tasks: Record<string, boolean>;
  onToggle: (key: string) => void;
  hydrated: boolean;
}

export default function WeekCard({ week, weekIndex, tasks, onToggle, hydrated }: WeekCardProps) {
  const [open, setOpen] = useState(true);
  const colors = colorMap[week.colorKey];

  const allTasks = week.days.reduce((s, d) => s + d.tasks.length, 0);
  const doneTasks = week.days.reduce(
    (s, d, di) => s + d.tasks.filter((_, ti) => tasks[taskKey(weekIndex, di, ti)]).length,
    0
  );
  const pct = allTasks ? Math.round((doneTasks / allTasks) * 100) : 0;

  return (
    <div className="bg-[#111827] border border-[#1e2d47] rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center gap-2.5 sm:gap-3 border-b border-[#1e2d47] cursor-pointer hover:bg-white/[0.02] transition-colors text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-widest px-2 sm:px-2.5 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${colors.badge}`}>
          {week.num}
        </span>
        <div className="flex-1 min-w-0 text-[12px] sm:text-[13px] font-medium text-[#e8edf5] leading-snug truncate">{week.title}</div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-[11px] text-[#4a5e7a] tabular-nums">
            {hydrated ? `${doneTasks}/${allTasks}` : `0/${allTasks}`}
          </span>
          <div className="w-10 sm:w-12 h-1 bg-[#1a2236] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
              style={{ width: hydrated ? `${pct}%` : '0%' }}
            />
          </div>
          <span className={`text-[10px] text-[#4a5e7a] transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>
            ▶
          </span>
        </div>
      </button>

      {open && (
        <div className="px-3 sm:px-5 pb-2">
          {week.days.map((day, di) => (
            <div key={di} className="py-3.5 border-b border-[#1e2d47] last:border-0">
              <div className="font-mono text-[10px] font-bold text-[#4a5e7a] uppercase tracking-widest mb-2.5">
                {day.label}
              </div>
              {day.tasks.map((task, ti) => {
                const k = taskKey(weekIndex, di, ti);
                const done = hydrated && !!tasks[k];
                return (
                  <div
                    key={ti}
                    className="flex items-start gap-2.5 py-2 sm:py-1.5 cursor-pointer group"
                    onClick={() => onToggle(k)}
                  >
                    <div
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 rounded flex items-center justify-center transition-all duration-150 border ${
                        done
                          ? 'bg-[#00d4aa] border-[#00d4aa]'
                          : 'bg-transparent border-[#2a3f5c]'
                      }`}
                    >
                      {done && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="#0a0e1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`text-[13px] leading-relaxed transition-colors duration-150 ${
                          done ? 'line-through text-[#4a5e7a]' : 'text-[#8a9bb5] group-hover:text-[#e8edf5]'
                        }`}
                      >
                        {task.text}
                      </span>
                      {task.tags.length > 0 && (
                        <span className="inline-flex gap-1 ml-1 align-middle">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-[10px] font-mono px-1.5 py-px rounded border tracking-wide ${tagStyles[tag] ?? ''}`}
                            >
                              {tagLabels[tag] ?? tag}
                            </span>
                          ))}
                        </span>
                      )}
                      {task.links.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1.5" onClick={(e) => e.stopPropagation()}>
                          {task.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0099ff] bg-[rgba(0,153,255,0.08)] border border-[rgba(0,153,255,0.18)] rounded px-2 py-0.5 hover:bg-[rgba(0,153,255,0.16)] hover:text-[#5bb8ff] transition-all"
                            >
                              <span className="text-[9px] opacity-70">↗</span>
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div className="my-3 px-4 py-2.5 bg-[rgba(0,212,170,0.05)] border-l-2 border-[#00d4aa] text-xs text-[#8a9bb5] leading-relaxed">
            {week.tip}
          </div>
        </div>
      )}
    </div>
  );
}
