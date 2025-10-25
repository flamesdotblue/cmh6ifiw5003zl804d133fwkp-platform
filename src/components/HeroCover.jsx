import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sprout } from 'lucide-react';

export default function HeroCover() {
  return (
    <section className="relative h-[68vh] min-h-[480px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black pointer-events-none" />

      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs mb-4">
            <Sprout size={14} />
            Multi-Modal AI for Precision Agriculture
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Actionable Insights, Not Raw Data.
          </h1>
          <p className="text-white/80 mt-3 md:mt-4 text-sm md:text-base">
            Cultiverse fuses satellite imagery, IoT sensors, and weather into a living digital twin of your farm. Predict risks, prioritize actions, and boost yield with confidence.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#twin"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 text-black px-4 py-2 text-sm font-medium hover:bg-emerald-400 transition"
            >
              <Rocket size={16} />
              Launch Dashboard
            </a>
            <a
              href="#trends"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/5 transition"
            >
              See Predictions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
