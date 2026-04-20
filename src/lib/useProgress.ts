'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProgressFile, ProgressState } from '@/types';

const STORAGE_KEY = 'sn_csa_tracker_v3';

function loadFromStorage(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: ProgressFile = JSON.parse(raw);
    return parsed.tasks ?? {};
  } catch {
    return {};
  }
}

function saveToStorage(tasks: ProgressState): void {
  const file: ProgressFile = {
    version: 3,
    lastUpdated: new Date().toISOString(),
    tasks,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(file, null, 2));
  } catch {
    // storage unavailable
  }
}

export function useProgress() {
  const [tasks, setTasks] = useState<ProgressState>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTasks(loadFromStorage());
    setHydrated(true);
  }, []);

  const toggle = useCallback((key: string) => {
    setTasks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveToStorage(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setTasks({});
    saveToStorage({});
  }, []);

  const exportProgress = useCallback(() => {
    const file: ProgressFile = {
      version: 3,
      lastUpdated: new Date().toISOString(),
      tasks,
    };
    const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csa-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [tasks]);

  const importProgress = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed: ProgressFile = JSON.parse(e.target?.result as string);
        const imported = parsed.tasks ?? {};
        setTasks(imported);
        saveToStorage(imported);
      } catch {
        alert('Invalid progress file.');
      }
    };
    reader.readAsText(file);
  }, []);

  return { tasks, toggle, reset, exportProgress, importProgress, hydrated };
}

export function taskKey(weekIndex: number, dayIndex: number, taskIndex: number): string {
  return `w${weekIndex}d${dayIndex}t${taskIndex}`;
}
