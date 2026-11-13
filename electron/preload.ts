import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ruby', {
  // window
  win: {
    minimize: () => ipcRenderer.invoke('win:minimize'),
    maximize: () => ipcRenderer.invoke('win:maximize'),
    close: () => ipcRenderer.invoke('win:close'),
  },
  // hardware
  hw: () => ipcRenderer.invoke('hw:get'),
  temp: () => ipcRenderer.invoke('hw:temp'),
  // processes
  procs: () => ipcRenderer.invoke('proc:list'),
  kill: (pid: number) => ipcRenderer.invoke('proc:kill', pid),
  killSafe: (pids: number[]) => ipcRenderer.invoke('proc:killSafe', pids),
  // power
  powerHigh: () => ipcRenderer.invoke('power:high'),
  powerBalanced: () => ipcRenderer.invoke('power:balanced'),
  cleanRam: () => ipcRenderer.invoke('power:cleanRam'),
  // games
  games: () => ipcRenderer.invoke('games:list'),
  launch: (exe: string) => ipcRenderer.invoke('games:launch', exe),
  // fps
  estimate: (game: string, preset: string) => ipcRenderer.invoke('fps:estimate', game, preset),
});