import { ipcMain } from 'electron';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export type Game = {
  id: string;
  name: string;
  exe: string;
  steamId?: string;
  accent: string;
};

export const GAMES: Game[] = [
  { id: 'cs2',      name: 'Counter-Strike 2', exe: 'cs2.exe',     steamId: '730',   accent: '#f5a623' },
  { id: 'dota2',    name: 'Dota 2',           exe: 'dota2.exe',   steamId: '570',   accent: '#c23c2a' },
  { id: 'rust',     name: 'Rust',             exe: 'RustClient.exe', steamId: '252490', accent: '#ce422b' },
  { id: 'fortnite', name: 'Fortnite',         exe: 'FortniteLauncher.exe', accent: '#7b68ee' },
  { id: 'apex',     name: 'Apex Legends',     exe: 'r5apex.exe',  steamId: '1172470', accent: '#da292a' },
  { id: 'valorant', name: 'Valorant',         exe: 'VALORANT.exe', accent: '#ff4655' },
];

export function registerGamesIpc() {
  ipcMain.handle('games:list', () => GAMES);

  ipcMain.handle('games:launch', async (_e, exe: string) => {
    try {
      // запускаем через start, чтобы найти в PATH или Steam
      await execAsync(`start "" "${exe}"`);
      return true;
    } catch {
      return false;
    }
  });
}