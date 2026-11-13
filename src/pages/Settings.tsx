import { GlassPanel } from '@/components/GlassPanel';
import { GoldText } from '@/components/GoldText';

export function SettingsPage() {
  return (
    <div style={{ padding: 24, height: '100%', overflowY: 'auto' }}>
      <GlassPanel style={{ padding: 24, marginBottom: 20 }}>
        <div className="title">Settings</div>
        <div className="subtitle">Preferences & about Ruby Hand.</div>
      </GlassPanel>

      <GlassPanel style={{ padding: 22, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>
          Appearance
        </div>
        <SettingRow label="Theme" value="Ruby Noir (default)" />
        <SettingRow label="Accent" value="Ruby #ff2d55" />
        <SettingRow label="Liquid Glass" value="Enabled" />
      </GlassPanel>

      <GlassPanel style={{ padding: 22, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>
          Performance
        </div>
        <SettingRow label="Auto Boost on launch" value="Off" />
        <SettingRow label="Process monitor interval" value="5 s" />
        <SettingRow label="Temp monitoring" value="On" />
      </GlassPanel>

      <GlassPanel style={{ padding: 22 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>
          About
        </div>
        <SettingRow label="Version" value="0.1.0" />
        <SettingRow label="Stack" value="Electron · React · TypeScript" />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
          <div
            style={{
              padding: '18px 36px',
              borderRadius: 20,
              background:
                'linear-gradient(135deg, rgba(255,210,100,0.06), rgba(0,0,0,0.25))',
              border: '1px solid rgba(255,210,100,0.22)',
              boxShadow: '0 0 60px rgba(255,210,100,0.1) inset',
            }}
          >
            <GoldText style={{ fontSize: 32 }}>dev darkfacek1d</GoldText>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13 }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}