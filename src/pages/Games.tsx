import { useEffect } from 'react';
import { GlassPanel } from '@/components/GlassPanel';
import { GameCard } from '@/components/GameCard';
import { useStore } from '@/store/useStore';

export function GamesPage() {
  const { games, setGames } = useStore();

  useEffect(() => {
    window.ruby.games().then(setGames);
  }, [setGames]);

  return (
    <div style={{ padding: 24, height: '100%', overflowY: 'auto' }}>
      <GlassPanel style={{ padding: 24, marginBottom: 20 }}>
        <div className="title">Games</div>
        <div className="subtitle">
          Choose a game — Ruby Hand will estimate FPS and recommend preset.
        </div>
      </GlassPanel>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
        }}
      >
        {games.map((g) => (
          <GameCard key={g.id} id={g.id} name={g.name} accent={g.accent} />
        ))}
      </div>
    </div>
  );
}