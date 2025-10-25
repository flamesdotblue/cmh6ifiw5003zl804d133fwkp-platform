import React from 'react';
import { AlertTriangle, Bug, Droplets, Thermometer, Bell } from 'lucide-react';

const severityStyles = {
  high: 'bg-rose-500/10 border-rose-500/30 text-rose-200',
  medium: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
  low: 'bg-sky-500/10 border-sky-500/30 text-sky-200',
};

function AlertItem({ title, detail, recommendation, icon: Icon, severity }) {
  return (
    <div className={`p-4 rounded-lg border ${severityStyles[severity]} flex gap-3`}>
      <div className="shrink-0 mt-0.5">
        <Icon size={18} />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {severity === 'high' && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded">
              <AlertTriangle size={12} /> High
            </span>
          )}
          {severity === 'medium' && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded">
              Medium
            </span>
          )}
          {severity === 'low' && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide bg-sky-500/20 text-sky-200 px-2 py-0.5 rounded">
              Low
            </span>
          )}
          <h4 className="font-medium">{title}</h4>
        </div>
        <p className="text-xs text-white/80">{detail}</p>
        <p className="text-xs text-white/70 italic">Recommended: {recommendation}</p>
      </div>
    </div>
  );
}

export default function AlertsPanel() {
  const alerts = [
    {
      title: 'Pest Risk in Zone 3',
      detail: 'Humidity > 90% for 72 hours and NDVI dip detected.',
      recommendation: 'Precision spray in Zone 3 within 24 hours.',
      icon: Bug,
      severity: 'high',
    },
    {
      title: 'Low Nitrogen in Zone 1',
      detail: 'Spectral index (NDRE) declining over 5-day window.',
      recommendation: 'Review fertilization plan and soil test.',
      icon: Droplets,
      severity: 'medium',
    },
    {
      title: 'Heat Stress Watch',
      detail: 'Daily max temp trend +2.1°C over baseline.',
      recommendation: 'Increase irrigation cadence during peak sun.',
      icon: Thermometer,
      severity: 'low',
    },
  ];

  return (
    <div className="h-full rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-sm">
          <Bell size={16} className="text-emerald-300" />
          <span className="uppercase tracking-wide text-white/80">Alerts</span>
        </div>
        <span className="text-xs text-white/50">Auto triage enabled</span>
      </div>
      <div className="p-4 space-y-3">
        {alerts.map((a, idx) => (
          <AlertItem key={idx} {...a} />
        ))}
      </div>
    </div>
  );
}
