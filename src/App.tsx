import { TitleBar } from '@/components/TitleBar';
import { Sidebar } from '@/components/Sidebar';
import { GamesPage } from '@/pages/Games';
import { OptimizePage } from '@/pages/Optimize';
import { BoostPage } from '@/pages/Boost';
import { SettingsPage } from '@/pages/Settings';
import { useStore } from '@/store/useStore';

export default function App() {
  const { page } = useStore();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TitleBar />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Sidebar />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {page === 'games' && <GamesPage />}
          {page === 'optimize' && <OptimizePage />}
          {page === 'boost' && <BoostPage />}
          {page === 'settings' && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}