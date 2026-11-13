import { ipcMain } from 'electron';
import si from 'systeminformation';

// Простая эвристика. Оценка "боевой мощи" железа 0..100
function cpuScore(brand: string, cores: number, speedGHz: number): number {
  const b = brand.toLowerCase();
  let base = 40;
  if (b.includes('i9') || b.includes('ryzen 9')) base = 90;
  else if (b.includes('i7') || b.includes('ryzen 7')) base = 78;
  else if (b.includes('i5') || b.includes('ryzen 5')) base = 60;
  else if (b.includes('i3') || b.includes('ryzen 3')) base = 42;
  const coreBonus = Math.min(cores, 16) * 1.2;
  const clockBonus = Math.max(0, speedGHz - 2.5) * 8;
  return Math.min(100, base + coreBonus + clockBonus);
}

function gpuScore(model: string, vramMB: number): number {
  const m = model.toLowerCase();
  let base = 30;
  if (m.includes('rtx 4090')) base = 100;
  else if (m.includes('rtx 4080')) base = 92;
  else if (m.includes('rtx 4070')) base = 82;
  else if (m.includes('rtx 4060')) base = 68;
  else if (m.includes('rtx 3090')) base = 90;
  else if (m.includes('rtx 3080')) base = 85;
  else if (m.includes('rtx 3070')) base = 76;
  else if (m.includes('rtx 3060')) base = 62;
  else if (m.includes('rtx 3050')) base = 45;
  else if (m.includes('gtx 1660')) base = 40;
  else if (m.includes('gtx 1650')) base = 32;
  else if (m.includes('rx 7900')) base = 95;
  else if (m.includes('rx 7800')) base = 85;
  else if (m.includes('rx 7700')) base = 78;
  else if (m.includes('rx 6700')) base = 70;
  else if (m.includes('rx 6600')) base = 55;
  const vramBonus = Math.min(vramMB / 1024, 24) * 0.8;
  return Math.min(100, base + vramBonus);
}

// база: условный FPS на "эталоне" (i5-12400 + RTX 3060, 16GB RAM)
const BASE_FPS: Record<string, number> = {
  cs2: 240,
  dota2: 180,
  rust: 95,
  fortnite: 130,
  apex: 145,
  valorant: 300,
};

const PRESET_MULT: Record<string, number> = {
  low: 1.4,
  competitive: 1.25,
  medium: 1.1,
  high: 1.0,
  ultra: 0.82,
};

export function registerFpsIpc() {
  ipcMain.handle('fps:estimate', async (_e, game: string, preset: string) => {
    const [cpu, gpu, mem] = await Promise.all([si.cpu(), si.graphics(), si.mem()]);
    const cScore = cpuScore(`${cpu.manufacturer} ${cpu.brand}`, cpu.cores, cpu.speed);
    const g0 = gpu.controllers[0];
   const gScore = g0 ? gpuScore(g0.model, g0.vram ?? 0) : 30;
    const ramGB = mem.total / 1024 ** 3;

    const score = cScore * 0.35 + gScore * 0.55 + Math.min(ramGB, 32) * 0.6;
    const base = BASE_FPS[game] ?? 100;
    const mult = PRESET_MULT[preset] ?? 1;

    const fps = Math.round(base * (score / 100) * mult);
    const fpsMin = Math.round(fps * 0.78);
    const fpsMax = Math.round(fps * 1.15);

    const bottleneck =
      cScore < gScore - 15 ? 'CPU'
      : gScore < cScore - 15 ? 'GPU'
      : 'Balanced';

    return { fps, fpsMin, fpsMax, score: Math.round(score), bottleneck };
  });
}