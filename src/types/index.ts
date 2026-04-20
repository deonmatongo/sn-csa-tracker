export interface TaskLink {
  label: string;
  url: string;
}

export type TaskTag = 'hands' | 'key' | 'mock' | 'free';

export interface Task {
  text: string;
  tags: TaskTag[];
  links: TaskLink[];
}

export interface Day {
  label: string;
  tasks: Task[];
}

export type ColorKey = 'w1' | 'w2' | 'w3' | 'w4';

export interface Week {
  id: number;
  num: string;
  colorKey: ColorKey;
  title: string;
  tip: string;
  days: Day[];
}

export interface ProgressState {
  [taskKey: string]: boolean;
}

export interface ProgressFile {
  version: number;
  lastUpdated: string;
  tasks: ProgressState;
}
