export function FpsGauge({ value, label }: { value: number; label?: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 54,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #ff2d55, #ff9eb2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {label && (
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{label}</div>
      )}
    </div>
  );
}