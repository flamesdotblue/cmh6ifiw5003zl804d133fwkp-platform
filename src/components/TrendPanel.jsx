import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function TrendPanel() {
  const { labels, soilMoisture, humidity, pestRisk } = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => i + 1);
    const sm = days.map((d) => 28 + Math.sin(d / 2) * 6 + (d > 8 ? -2 : 0));
    const hu = days.map((d) => 70 + Math.cos(d / 3) * 10 + (d > 9 ? 8 : 0));
    const pr = days.map((d, i) => Math.max(5, Math.min(95, 15 + i * 4 + (hu[i] > 80 ? 8 : 0) - (sm[i] > 30 ? 6 : 0))));
    return { labels: days.map((d) => `Day ${d}`), soilMoisture: sm, humidity: hu, pestRisk: pr };
  }, []);

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Soil Moisture (%)',
        data: soilMoisture,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.25)',
        tension: 0.35,
        yAxisID: 'y1',
        pointRadius: 2,
      },
      {
        label: 'Humidity (%)',
        data: humidity,
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.25)',
        tension: 0.35,
        yAxisID: 'y1',
        pointRadius: 2,
      },
      {
        label: 'Pest Risk (pred %)',
        data: pestRisk,
        borderColor: '#f472b6',
        backgroundColor: 'rgba(244, 114, 182, 0.2)',
        tension: 0.35,
        yAxisID: 'y2',
        pointRadius: 2,
      },
    ],
  }), [labels, soilMoisture, humidity, pestRisk]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#d1d5db', boxWidth: 12, usePointStyle: true },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          labelColor: (ctx) => ({ borderColor: ctx.dataset.borderColor, backgroundColor: ctx.dataset.borderColor }),
        },
      },
    },
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        ticks: { color: '#9ca3af', maxRotation: 0 },
        grid: { color: 'rgba(255,255,255,0.06)' },
      },
      y1: {
        type: 'linear',
        position: 'left',
        min: 20,
        max: 100,
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(255,255,255,0.06)' },
      },
      y2: {
        type: 'linear',
        position: 'right',
        min: 0,
        max: 100,
        ticks: { color: '#9ca3af' },
        grid: { drawOnChartArea: false },
      },
    },
  }), []);

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
        <div className="relative h-[300px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
