export function TitleBar() {
  return (
    <div
      className="drag-region"
      style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #ff2d55, #ff5e78)',
            boxShadow: '0 0 16px rgba(255,45,85,0.5)',
          }}
        />
        <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.02em' }}>
          Ruby Hand
        </span>
      </div>

      <div className="no-drag" style={{ display: 'flex', gap: 8 }}>
        <WinBtn onClick={() => window.ruby.win.minimize()} label="—" />
        <WinBtn onClick={() => window.ruby.win.maximize()} label="▢" />
        <WinBtn onClick={() => window.ruby.win.close()} label="✕" danger />
      </div>
    </div>
  );
}

function WinBtn({ onClick, label, danger }: { onClick: () => void; label: string; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 32,
        height: 26,
        background: 'transparent',
        border: 'none',
        color: '#c8c8d0',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 12,
        transition: 'all 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = danger ? '#ff2d55' : 'rgba(255,255,255,0.08)';
        e.currentTarget.style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#c8c8d0';
      }}
    >
      {label}
    </button>
  );
}