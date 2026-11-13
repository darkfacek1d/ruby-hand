import { useStore, Page } from '@/store/useStore';

const ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'games', label: 'Games', icon: '🎮' },
  { id: 'optimize', label: 'Optimize', icon: '⚡' },
  { id: 'boost', label: 'Boost', icon: '🚀' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export function Sidebar() {
  const { page, setPage } = useStore();

  return (
    <div
      className="glass-panel"
      style={{
        width: 220,
        margin: 16,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ padding: '8px 12px 18px' }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Navigation
        </div>
      </div>

      {ITEMS.map((it) => {
        const active = page === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setPage(it.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 14px',
              background: active
                ? 'linear-gradient(135deg, rgba(255,45,85,0.22), rgba(255,94,120,0.12))'
                : 'transparent',
              border: active ? '1px solid rgba(255,45,85,0.35)' : '1px solid transparent',
              color: active ? '#fff' : '#b0b0b8',
              borderRadius: 12,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: active ? 600 : 500,
              fontFamily: 'inherit',
              textAlign: 'left',
              transition: 'all 0.18s',
              boxShadow: active ? '0 4px 20px rgba(255,45,85,0.15)' : 'none',
            }}
          >
            <span style={{ fontSize: 16 }}>{it.icon}</span>
            {it.label}
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', padding: 12, fontSize: 11, color: 'var(--muted)' }}>
        v0.1.0 · {new Date().getFullYear()}
      </div>
    </div>
  );
}