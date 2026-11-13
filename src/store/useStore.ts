import { create } from 'zustand';

export type Page = 'games' | 'optimize' | 'boost' | 'settings';

export type Hardware = {
  cpu: { brand: string; cores: number; physicalCores: number; speedGHz: number };
  gpu: { model: string; vramMB: number; vendor: string }[];
  ram: { totalGB: number; usedGB: number };
  os: { platform: string; distro: string; release: string };
  disks: { mount: string; sizeGB: number; usedGB: number }[];
  motherboard: { vendor: string; model: string };
};

export type Proc = { pid: number; name: string; cpu: number; memMB: number };

export type Game = {
  id: string;
  name: string;
  exe: string;
  accent: string;
};

type Store = {
  page: Page;
  setPage: (p: Page) => void;
  hardware: Hardware | null;
  setHardware: (h: Hardware) => void;
  processes: Proc[];
  setProcesses: (p: Proc[]) => void;
  games: Game[];
  setGames: (g: Game[]) => void;
};

export const useStore = create<Store>((set) => ({
  page: 'games',
  setPage: (page) => set({ page }),
  hardware: null,
  setHardware: (hardware) => set({ hardware }),
  processes: [],
  setProcesses: (processes) => set({ processes }),
  games: [],
  setGames: (games) => set({ games }),
}));