import React, { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';

const zones = [
  { id: 'Zone 1', x: 8, y: 10, w: 38, h: 32, health: 0.72, nitrogen: 'low' },
  { id: 'Zone 2', x: 52, y: 12, w: 38, h: 26, health: 0.86, nitrogen: 'ok' },
  { id: 'Zone 3', x: 16, y: 50, w: 60, h: 38, health: 0.58, nitrogen: 'ok' },
];

const sensors = [
  { id: 'S-01', label: 'Soil Moisture', x: 24, y: 22, value: '31%' },
  { id: 'S-02', label: 'Air Temp', x: 68, y: 24, value: '33°C' },
  { id: 'S-03', label: 'Humidity', x: 54, y: 68, value: '91%' },
];

function HealthLegend() {
  return (
    <div className="absolute right-4 top-4 z-[5] rounded-md border border-white/10 bg-black/50 backdrop-blur px-3 py-2 text-xs">
      <div className="font-medium mb-1 text-white/90">Health Index</div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 rounded" />
        <div className="text-white/60">0 — 1</div>
      </div>
    </div>
  );
}

export default function DigitalTwinMap() {
  const [selected, setSelected] = useState(zones[0]);

  const panelData = useMemo(() => {
    const z = selected;
    return {
      title: z.id,
      health: z.health,
      nitrogen: z.nitrogen,
      summary:
        z.id === 'Zone 3'
          ? 'Elevated pest probability from humidity trend + spectral shift.'
          : z.id === 'Zone 1'
          ? 'Nitrogen deficiency suspected from NDRE decline.'
          : 'Stable conditions with improving canopy vigor.',
    };
  }, [selected]);

  return (
    <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#070907]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="text-sm text-white/80">Farm Digital Twin</div>
        <div className="text-xs text-white/50">Spatio-temporal fusion view</div>
      </div>

      <div className="relative h-[420px]">
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_1px_1px,#9FE9C4_1px,transparent_0)] [background-size:22px_22px]" />

        <div className="absolute inset-0">
          {zones.map((z) => (
            <button
              key={z.id}
              onClick={() => setSelected(z)}
              className={`absolute rounded-md ring-1 ring-white/20 transition focus:outline-none focus:ring-emerald-400`}
              style={{
                left: `${z.x}%`,
                top: `${z.y}%`,
                width: `${z.w}%`,
                height: `${z.h}%`,
                background:
                  'linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(251,191,36,0.25) 50%, rgba(244,63,94,0.25) 100%)',
                boxShadow:
                  selected.id === z.id
                    ? '0 0 0 2px rgba(16,185,129,0.6) inset, 0 0 30px rgba(16,185,129,0.25)'
                    : '0 0 0 1px rgba(255,255,255,0.08) inset',
              }}
              aria-label={`Select ${z.id}`}
            />
          ))}

          {sensors.map((s) => (
            <div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <div className="flex items-center gap-2 px-2 py-1 rounded-md border border-white/20 bg-black/60 backdrop-blur text-xs">
                <MapPin size={14} className="text-emerald-300" />
                <span className="text-white/80">{s.id}</span>
                <span className="text-white/60">{s.value}</span>
              </div>
            </div>
          ))}
        </div>

        <HealthLegend />
      </div>

      <div className="border-t border-white/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-sm font-medium">{panelData.title}</div>
          <div className="text-xs text-white/70">{panelData.summary}</div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-white/60">Health</span>
            <div className="w-32 h-2 bg-white/10 rounded">
              <div
                className="h-2 rounded bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400"
                style={{ width: `${Math.round(panelData.health * 100)}%` }}
              />
            </div>
            <span className="text-white/80 w-8 text-right">{Math.round(panelData.health * 100)}%</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-white/60">Nitrogen</span>
            <span className={`px-2 py-0.5 rounded border text-xs ${panelData.nitrogen === 'low' ? 'border-amber-400/40 text-amber-200' : 'border-emerald-400/40 text-emerald-200'}`}>
              {panelData.nitrogen === 'low' ? 'Low' : 'OK'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
