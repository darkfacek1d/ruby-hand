import { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/GlassPanel';
import { GoldText } from '@/components/GoldText';
import { useStore } from '@/store/useStore';

export function OptimizePage() {
  const { hardware, setHardware } = useStore();
  const [temp, setTemp] = useState<{ cpuC: number | null; gpuC: number | null }>({
    cpuC: null,
    gpuC: null,
  });

  useEffect(() => {
    window.ruby.hw().then(setHardware);
    const i = setInterval(() => window.ruby.temp().then(setTemp), 3000);
    window.ruby.temp().then(setTemp);
    return () => clearInterval(i);
  }, [setHardware]);

  return (
    <div style={{ padding: 24, height: '100%', overflowY: 'auto' }}>
      <GlassPanel style={{ padding: 24, marginBottom: 20 }}>
        <div className="title">Optimize</div>
        <div className="subtitle">System overview & recommended actions.</div>
      </GlassPanel>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <GlassPanel style={{ padding: 22 }}>
          <SectionTitle>CPU</SectionTitle>
          <Row label="Model" value={hardware?.cpu.brand ?? '—'} />
          <Row label="Cores" value={hardware ? `${hardware.cpu.physicalCores}C / ${hardware.cpu.cores}T` : '—'} />
          <Row label="Clock" value={hardware ? `${hardware.cpu.speedGHz} GHz` : '—'} />
          <Row
            label="Temp"
            value={temp.cpuC != null ? `${temp.cpuC} °C` : 'n/a'}
            highlight={temp.cpuC != null && temp.cpuC > 80}
          />
        </GlassPanel>

        <GlassPanel style={{ padding: 22 }}>
          <SectionTitle>GPU</SectionTitle>
          {hardware?.gpu.map((g, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <Row label="Model" value={g.model} />
              <Row label="VRAM" value={`${g.vramMB} MB`} />
            </div>
          ))}
          <Row
            label="Temp"
            value={temp.gpuC != null ? `${temp.gpuC} °C` : 'n/a'}
            highlight={temp.gpuC != null && temp.gpuC > 85}
          />
        </GlassPanel>

        <GlassPanel style={{ padding: 22 }}>
          <SectionTitle>RAM</SectionTitle>
          <Row label="Total" value={hardware ? `${hardware.ram.totalGB} GB` : '—'} />
          <Row label="Used" value={hardware ? `${hardware.ram.usedGB} GB` : '—'} />
        </GlassPanel>

        <GlassPanel style={{ padding: 22 }}>
          <SectionTitle>System</SectionTitle>
          <Row label="OS" value={hardware ? `${hardware.os.distro} ${hardware.os.release}` : '—'} />
          <Row label="Motherboard" value={hardware ? `${hardware.motherboard.vendor} ${hardware.motherboard.model}` : '—'} />
        </GlassPanel>
      </div>

      {/* 🔥 Золотой подпись разработчика */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, marginBottom: 12 }}>
        <div
          style={{
            padding: '14px 28px',
            borderRadius: 18,
            background:
              'linear-gradient(135deg, rgba(255,210,100,0.06), rgba(0,0,0,0.2))',
            border: '1px solid rgba(255,210,100,0.18)',
            boxShadow: '0 0 40px rgba(255,210,100,0.08) inset',
          }}
        >
          <GoldText style={{ fontSize: 26 }}>dev darkfacek1d</GoldText>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
      {children}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{ color: highlight ? '#ff5e78' : 'var(--text)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}