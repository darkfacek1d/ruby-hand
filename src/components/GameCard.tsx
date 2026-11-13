import { useState } from 'react';
import { GlassPanel } from './GlassPanel';
import { FpsGauge } from './FpsGauge';
import { GoldText } from './GoldText';

type Props = {
  id: string;
  name: string;
  accent: string;
};

const PRESETS = [
  { id: 'low', label: 'Low' },
  { id: 'competitive', label: 'Competitive' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
  { id: 'ultra', label: 'Ultra' },
];

export function GameCard({ id, name, accent }: Props) {
  const [preset, setPreset] = useState('competitive');
  const [data, setData] = useState<{
    fps: number; fpsMin: number; fpsMax: number; score: number; bottleneck: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    const res = await window.ruby.estimate(id, preset);
    setData(res);
    setLoading(false);
  }

  return (
    <GlassPanel className="p-6" style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
              boxShadow: `0 4px 20px ${accent}55`,
            }}
          />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
              Ready to estimate
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 18, flexWrap: 'wrap' }}>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPreset(p.id)}
            style={{
              padding: '7px 12px',
              borderRadius: 10,
              fontSize: 12,
              cursor: 'pointer',
              border: preset === p.id ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.08)',
              background: preset === p.id ? `${accent}22` : 'rgba(255,255,255,0.03)',
              color: preset === p.id ? '#fff' : '#b0b0b8',
              fontFamily: 'inherit',
              fontWeight: 500,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 22 }}>
        <button className="btn btn-accent" onClick={analyze} disabled={loading}>
          {loading ? 'Analyzing…' : 'Estimate FPS'}
        </button>
      </div>

      {data && (
        <div
          style={{
            marginTop: 18,
            padding: 16,
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FpsGauge value={data.fps} label={`≈ ${data.fpsMin}–${data.fpsMax} FPS`} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Bottleneck
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{data.bottleneck}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>Score {data.score}/100</div>
          </div>
        </div>
      )}
    </GlassPanel>
  );
}