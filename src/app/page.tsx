'use client';

import { useMemo } from 'react';
import weeksData from '@/data/weeks.json';
import { Week } from '@/types';
import { useProgress, taskKey } from '@/lib/useProgress';
import Header from '@/components/Header';
import StatsBar from '@/components/StatsBar';
import ProgressBar from '@/components/ProgressBar';
import WeekCard from '@/components/WeekCard';
import ResourcesSection from '@/components/ResourcesSection';
import Footer from '@/components/Footer';

const weeks = weeksData as Week[];

export default function Home() {
  const { tasks, toggle, reset, exportProgress, importProgress, hydrated } = useProgress();

  const { done, total, pct } = useMemo(() => {
    let total = 0;
    let done = 0;
    weeks.forEach((week, wi) =>
      week.days.forEach((day, di) =>
        day.tasks.forEach((_, ti) => {
          total++;
          if (tasks[taskKey(wi, di, ti)]) done++;
        })
      )
    );
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#e8edf5] leading-relaxed">
      <Header overallPct={hydrated ? pct : 0} />
      <StatsBar />
      <ProgressBar done={hydrated ? done : 0} total={total} pct={hydrated ? pct : 0} />
      <div className="grid grid-cols-2 gap-5 px-10 pb-10 max-[900px]:grid-cols-1">
        {weeks.map((week, wi) => (
          <WeekCard
            key={week.id}
            week={week}
            weekIndex={wi}
            tasks={tasks}
            onToggle={toggle}
            hydrated={hydrated}
          />
        ))}
      </div>
      <ResourcesSection />
      <Footer onReset={reset} onExport={exportProgress} onImport={importProgress} />
    </div>
  );
}
