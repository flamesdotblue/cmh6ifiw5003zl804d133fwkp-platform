import React from 'react';
import HeroCover from './components/HeroCover';
import AlertsPanel from './components/AlertsPanel';
import DigitalTwinMap from './components/DigitalTwinMap';
import TrendPanel from './components/TrendPanel';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
            <span className="text-lg font-semibold tracking-wide">Cultiverse</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#twin" className="hover:text-white">Digital Twin</a>
            <a href="#alerts" className="hover:text-white">Alerts</a>
            <a href="#trends" className="hover:text-white">Trends</a>
          </nav>
        </div>
      </header>

      <main>
        <HeroCover />

        <section id="twin" className="max-w-7xl mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DigitalTwinMap />
            </div>
            <div id="alerts" className="lg:col-span-1">
              <AlertsPanel />
            </div>
          </div>
        </section>

        <section id="trends" className="max-w-7xl mx-auto px-4 pb-14">
          <TrendPanel />
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Cultiverse — Multi-Modal, Spatio-Temporal AI for Predictive Agriculture
      </footer>
    </div>
  );
}
