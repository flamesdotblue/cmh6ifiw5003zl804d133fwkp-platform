import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

function Line({ points, color = '#34d399', width = 2 }) {
  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
    .join(' ');
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />;
}

export default function TrendPanel() {
  // Synthetic sample data representing 14 days
  const data = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => i);
    const soilMoisture = days.map((d) => 28 + Math.sin(d / 2) * 6 + (d > 8 ? -2 : 0));
    const humidity = days.map((d) => 70 + Math.cos(d / 3) * 10 + (d > 9 ? 8 : 0));
    const pestRisk = days.map((d) => Math.max(5, Math.min(95, 20 + d * 4 + (humidity[d] > 80 ? 8 : 0) - (soilMoisture[d] > 30 ? 6 : 0))));
    return { days, soilMoisture, humidity, pestRisk };
  }, []);

  const chart = useMemo(() => {
    const W = 920;
    const H = 260;
    const P = 28;
    const x = (i) => P + (i * (W - P * 2)) / (data.days.length - 1);
    const yScale = (min, max) => (v) => P + (H - P * 2) - ((v - min) * (H - P * 2)) / (max - min || 1);

    const y1 = yScale(20, 40); // soil moisture
    const y2 = yScale(60, 95); // humidity
    const y3 = yScale(0, 100); // pest risk

    const smPoints = data.days.map((d, i) => [x(i), y1(data.soilMoisture[i])]);
    const huPoints = data.days.map((d, i) => [x(i), y2(data.humidity[i])]);
    const prPoints = data.days.map((d, i) => [x(i), y3(data.pestRisk[i])]);

    return { W, H, P, smPoints, huPoints, prPoints };
  }, [data]);

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-white/5">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp size={16} className="text-emerald-300" />
          <span className="uppercase tracking-wide text-white/80">Temporal Trends</span>
        </div>
        <span className="text-xs text-white/50">Why an alert was triggered</span>
      </div>

      <div className="p-4">
        <div className="text-sm text-white/80 mb-2">Zone Insights (last 14 days)</div>
        <div className="relative">
          <svg width="100%" viewBox={`0 0 ${chart.W} ${chart.H}`} className="block">
            <defs>
              <linearGradient id="gridFade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopOpacity="0.2" stopColor="#ffffff" />
                <stop offset="100%" stopOpacity="0.05" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width={chart.W} height={chart.H} fill="transparent" />

            {Array.from({ length: 6 }).map((_, i) => {
              const y = chart.P + (i * (chart.H - chart.P * 2)) / 5;
              return <line key={i} x1={chart.P} x2={chart.W - chart.P} y1={y} y2={y} stroke="url(#gridFade)" strokeWidth="1" />;
            })}

            <Line points={chart.smPoints} color="#38bdf8" width={2.5} />
            <Line points={chart.huPoints} color="#22d3ee" width={2.5} />
            <Line points={chart.prPoints} color="#f472b6" width={2.5} />
          </svg>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-white/80">
              <span className="inline-block h-2 w-6 rounded bg-sky-400" /> Soil Moisture
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="inline-block h-2 w-6 rounded bg-cyan-400" /> Humidity
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="inline-block h-2 w-6 rounded bg-pink-400" /> Pest Risk (pred)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
