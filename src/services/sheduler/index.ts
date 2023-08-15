import { Callback } from 'types';

export interface IScheduler {
  tasks: Map<string, number>;
  register: (key: string, callback: Callback, interval: number) => void;
  destroy: () => void;
}

export class Scheduler implements IScheduler {
  tasks = new Map<string, number>();

  register(key: string, callback: Callback, interval: number) {
    const intervalID = setInterval(callback, interval) as unknown as number;
    this.tasks.set(key, intervalID);
  }

  unregister(key: string) {
    const intervalID = this.tasks.get(key);
    if (intervalID) {
      clearInterval(intervalID);
      this.tasks.delete(key);
    }
  }

  destroy() {
    const intervalIDs = [...this.tasks.values()];
    intervalIDs.forEach((id) => clearInterval(id));
    this.tasks.clear();
  }
}
