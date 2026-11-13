import { ipcMain } from 'electron';
import si from 'systeminformation';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

// Процессы, которые НЕЛЬЗЯ трогать
const WHITELIST = new Set([
  'system', 'system idle process', 'svchost.exe', 'explorer.exe',
  'winlogon.exe', 'csrss.exe', 'wininit.exe', 'smss.exe', 'lsass.exe',
  'services.exe', 'fontdrvhost.exe', 'dwm.exe', 'ctfmon.exe', 'audiodg.exe',
  'electron.exe', 'ruby hand.exe', 'node.exe',
]);

export function registerProcessesIpc() {
  ipcMain.handle('proc:list', async () => {
    const procs = await si.processes();
    return procs.list
      .filter((p) => !WHITELIST.has(p.name.toLowerCase()))
      .filter((p) => p.cpu > 0.3 || p.memRss > 80 * 1024)
      .sort((a, b) => b.cpu - a.cpu || b.memRss - a.memRss)
      .slice(0, 60)
      .map((p) => ({
        pid: p.pid,
        name: p.name,
        cpu: +p.cpu.toFixed(1),
        memMB: Math.round(p.memRss / 1024),
      }));
  });

  ipcMain.handle('proc:kill', async (_e, pid: number) => {
    try {
      await execAsync(`taskkill /PID ${pid} /F`);
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('proc:killSafe', async (_e, pids: number[]) => {
    const results: { pid: number; ok: boolean }[] = [];
    for (const pid of pids) {
      try {
        await execAsync(`taskkill /PID ${pid} /F`);
        results.push({ pid, ok: true });
      } catch {
        results.push({ pid, ok: false });
      }
    }
    return results;
  });
}