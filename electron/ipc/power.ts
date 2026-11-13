import { ipcMain } from 'electron';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export function registerPowerIpc() {
  ipcMain.handle('power:high', async () => {
    try {
      await execAsync('powercfg /setactive SCHEME_MIN'); // High performance
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('power:balanced', async () => {
    try {
      await execAsync('powercfg /setactive SCHEME_BALANCED');
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('power:cleanRam', async () => {
    try {
      // Работает только с правами админа и при наличии EmptyStandbyList.exe
      await execAsync('"C:\\Windows\\System32\\EmptyStandbyList.exe" standbylist');
      return true;
    } catch {
      return false;
    }
  });
}