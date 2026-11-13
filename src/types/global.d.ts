export {};

declare global {
  interface Window {
    ruby: {
      win: {
        minimize: () => Promise<void>;
        maximize: () => Promise<void>;
        close: () => Promise<void>;
      };
      hw: () => Promise<any>;
      temp: () => Promise<{ cpuC: number | null; gpuC: number | null }>;
      procs: () => Promise<{ pid: number; name: string; cpu: number; memMB: number }[]>;
      kill: (pid: number) => Promise<boolean>;
      killSafe: (pids: number[]) => Promise<{ pid: number; ok: boolean }[]>;
      powerHigh: () => Promise<boolean>;
      powerBalanced: () => Promise<boolean>;
      cleanRam: () => Promise<boolean>;
      games: () => Promise<{ id: string; name: string; exe: string; accent: string }[]>;
      launch: (exe: string) => Promise<boolean>;
      estimate: (
        game: string,
        preset: string
      ) => Promise<{ fps: number; fpsMin: number; fpsMax: number; score: number; bottleneck: string }>;
    };
  }
}