import { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/GlassPanel';
import { useStore } from '@/store/useStore';

export function BoostPage() {
  const { processes, setProcesses } = useStore();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  async function refresh() {
    const list = await window.ruby.procs();
    setProcesses(list);
    setSelected(new Set());
  }

  useEffect(() => {
    refresh();
    const i = setInterval(refresh, 5000);
    return () => clearInterval(i);
  }, []);

  function toggle(pid: number) {
    const s = new Set(selected);
    s.has(pid) ? s.delete(pid) : s.add(pid);
    setSelected(s);
  }

  async function killSelected() {
    if (selected.size === 0) return;
    setBusy(true);
    setMsg('');
    const res = await window.ruby.killSafe(Array.from(selected));
    const ok = res.filter((r) => r.ok).length;
    setMsg(`Terminated ${ok}/${res.length} processes.`);
    setBusy(false);
    refresh();
  }

  async function boostMode() {
    setBusy(true);
    setMsg('');
    await window.ruby.powerHigh();
    const res = await window.ruby.procs();
    // убиваем топ-10 самых тяжёлых, кроме whitelist (фильтруется в main)
    const top = res.slice(0, 10).map((p) => p.pid);
    await window.ruby.killSafe(top);
    setMsg(`Boost applied — power plan switched, ${top.length} processes freed.`);
    setBusy(false);
    refresh();
  }

  return (
    <div style={{ padding: 24, height: '100%', overflowY: 'auto' }}>
      <GlassPanel style={{ padding: 24, marginBottom: 20 }}>
        <div className="title">Boost</div>
        <div className="subtitle">Free up CPU & RAM before launching your game.</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn btn-accent" onClick={boostMode} disabled={busy}>
            🚀 One-Click Boost
          </button>
          <button className="btn" onClick={() => window.ruby.powerHigh()}>
            ⚡ High Performance
          </button>
          <button className="btn" onClick={() => window.ruby.powerBalanced()}>
            🔋 Balanced
          </button>
          <button className="btn" onClick={() => window.ruby.cleanRam()}>
            🧹 Clean RAM
          </button>
        </div>
        {msg && <div style={{ marginTop: 12, fontSize: 13, color: 'var(--accent-2)' }}>{msg}</div>}
      </GlassPanel>

      <GlassPanel style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            Top processes · {processes.length} shown
          </div>
          <button className="btn btn-accent" onClick={killSelected} disabled={busy || selected.size === 0}>
            Terminate ({selected.size})
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {processes.map((p) => {
            const sel = selected.has(p.pid);
            return (
              <div
                key={p.pid}
                onClick={() => toggle(p.pid)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '30px 1fr 90px 90px 70px',
                  alignItems: 'center',
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: sel ? 'rgba(255,45,85,0.12)' : 'rgba(255,255,255,0.02)',
                  border: sel ? '1px solid rgba(255,45,85,0.35)' : '1px solid transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: sel ? 'var(--accent)' : 'transparent',
                  }}
                />
                <div style={{ fontWeight: 500 }}>{p.name}</div>
                <div style={{ color: 'var(--muted)' }}>CPU {p.cpu}%</div>
                <div style={{ color: 'var(--muted)' }}>{p.memMB} MB</div>
                <div style={{ color: 'var(--muted)', fontSize: 11 }}>#{p.pid}</div>
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
}