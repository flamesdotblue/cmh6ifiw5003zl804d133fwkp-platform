import React, { useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polygon, Marker, Popup, ScaleControl } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix default marker icons for Leaflet in bundlers
const DefaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const center = [19.076, 72.877]; // Mumbai region (demo)

const zones = [
  {
    id: 'Zone 1',
    health: 0.72,
    nitrogen: 'low',
    color: '#fb923c',
    coords: [
      [19.082, 72.868],
      [19.082, 72.884],
      [19.072, 72.884],
      [19.072, 72.868],
    ],
  },
  {
    id: 'Zone 2',
    health: 0.86,
    nitrogen: 'ok',
    color: '#34d399',
    coords: [
      [19.09, 72.868],
      [19.09, 72.884],
      [19.082, 72.884],
      [19.082, 72.868],
    ],
  },
  {
    id: 'Zone 3',
    health: 0.58,
    nitrogen: 'ok',
    color: '#f43f5e',
    coords: [
      [19.072, 72.868],
      [19.072, 72.884],
      [19.062, 72.884],
      [19.062, 72.868],
    ],
  },
];

const sensors = [
  { id: 'S-01', label: 'Soil Moisture', value: '31%', pos: [19.080, 72.874] },
  { id: 'S-02', label: 'Air Temp', value: '33°C', pos: [19.086, 72.878] },
  { id: 'S-03', label: 'Humidity', value: '91%', pos: [19.069, 72.879] },
];

function HealthLegend() {
  return (
    <div className="absolute right-4 top-4 z-[1000] rounded-md border border-white/10 bg-black/60 backdrop-blur px-3 py-2 text-xs">
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

      <div className="relative h-[460px]">
        <MapContainer center={center} zoom={13} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ScaleControl position="bottomleft" />

          {zones.map((z) => (
            <Polygon
              key={z.id}
              positions={z.coords}
              pathOptions={{ color: z.color, weight: 2, fillOpacity: 0.25 }}
              eventHandlers={{
                click: () => setSelected(z),
              }}
            />
          ))}

          {sensors.map((s) => (
            <Marker key={s.id} position={s.pos}>
              <Popup>
                <div className="text-xs">
                  <div className="font-medium flex items-center gap-1">
                    <MapPin size={14} className="text-emerald-400" /> {s.id}
                  </div>
                  <div className="text-white/70">{s.label}: {s.value}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

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
