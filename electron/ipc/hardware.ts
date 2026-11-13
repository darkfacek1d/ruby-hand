import { ipcMain } from 'electron';
import si from 'systeminformation';

export function registerHardwareIpc() {
  ipcMain.handle('hw:get', async () => {
    const [cpu, gpu, mem, osInfo, disks, motherboard] = await Promise.all([
      si.cpu(),
      si.graphics(),
      si.mem(),
      si.osInfo(),
      si.fsSize(),
      si.baseboard(),
    ]);

    return {
      cpu: {
        brand: `${cpu.manufacturer} ${cpu.brand}`,
        cores: cpu.cores,
        physicalCores: cpu.physicalCores,
        speedGHz: cpu.speed,
      },
      gpu: gpu.controllers.map((g) => ({
        model: g.model,
        vramMB: g.vram,
        vendor: g.vendor,
      })),
      ram: {
        totalGB: +(mem.total / 1024 ** 3).toFixed(1),
        usedGB: +(mem.used / 1024 ** 3).toFixed(1),
      },
      os: { platform: osInfo.platform, distro: osInfo.distro, release: osInfo.release },
      disks: disks.map((d) => ({
        mount: d.mount,
        sizeGB: Math.round(d.size / 1024 ** 3),
        usedGB: Math.round(d.used / 1024 ** 3),
      })),
      motherboard: { vendor: motherboard.manufacturer, model: motherboard.model },
    };
  });

  ipcMain.handle('hw:temp', async () => {
    try {
      const t = await si.cpuTemperature();
      const g = await si.graphics();
      return {
        cpuC: t.main ?? null,
        gpuC: g.controllers[0]?.temperatureGpu ?? null,
      };
    } catch {
      return { cpuC: null, gpuC: null };
    }
  });
}