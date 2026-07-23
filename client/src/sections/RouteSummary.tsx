import {
  MapPin,
  Clock,
  GasPump,
  Coffee,
  ArrowRight,
  Package,
  CheckCircle,
} from "@phosphor-icons/react";

const tripMetrics = [
  {
    label: "Total Distance",
    value: "612",
    unit: "mi",
    icon: MapPin,
    accent: "text-blue-400",
    bg: "bg-blue-950/40",
    border: "border-blue-900/50",
  },
  {
    label: "Trip Duration",
    value: "11.2",
    unit: "hrs",
    icon: Clock,
    accent: "text-amber-400",
    bg: "bg-amber-950/40",
    border: "border-amber-900/50",
  },
  {
    label: "Fuel Stops",
    value: "1",
    unit: "stop",
    icon: GasPump,
    accent: "text-red-400",
    bg: "bg-red-950/40",
    border: "border-red-900/50",
  },
  {
    label: "Required Breaks",
    value: "1",
    unit: "× 30 min",
    icon: Coffee,
    accent: "text-emerald-400",
    bg: "bg-emerald-950/40",
    border: "border-emerald-900/50",
  },
];

const routeStops = [
  {
    id: "current",
    label: "DALLAS, TX",
    sublabel: "Current Position",
    x: 60,
    y: 260,
    color: "#60a5fa",
    ring: "rgba(96,165,250,0.25)",
    type: "origin",
  },
  {
    id: "pickup",
    label: "FORT WORTH, TX",
    sublabel: "Pickup · MI 32",
    x: 240,
    y: 160,
    color: "#fbbf24",
    ring: "rgba(251,191,36,0.25)",
    type: "pickup",
  },
  {
    id: "fuel",
    label: "FUEL · MI 268",
    sublabel: "Sunoco Travel Plaza",
    x: 480,
    y: 200,
    color: "#f87171",
    ring: null,
    type: "fuel",
  },
  {
    id: "rest",
    label: "REST · MI 402",
    sublabel: "I-30 Rest Area",
    x: 640,
    y: 140,
    color: "#94a3b8",
    ring: null,
    type: "rest",
  },
  {
    id: "dropoff",
    label: "MEMPHIS, TN",
    sublabel: "Dropoff · MI 612",
    x: 840,
    y: 80,
    color: "#34d399",
    ring: "rgba(52,211,153,0.25)",
    type: "dropoff",
  },
];

const checkpoints = [
  {
    id: "pickup",
    type: "Pickup",
    location: "Fort Worth, TX",
    duration: "1h 00m",
    window: "08:15 – 09:15",
    mileMarker: "MI 32",
    icon: Package,
    accent: "text-amber-400",
    bg: "bg-amber-950/30",
    border: "border-amber-900/40",
    dotColor: "bg-amber-400",
    note: "Load freight — dock bay assignment on arrival",
  },
  {
    id: "dropoff",
    type: "Dropoff",
    location: "Memphis, TN",
    duration: "1h 00m",
    window: "19:45 – 20:45",
    mileMarker: "MI 612",
    icon: CheckCircle,
    accent: "text-emerald-400",
    bg: "bg-emerald-950/30",
    border: "border-emerald-900/40",
    dotColor: "bg-emerald-400",
    note: "Unload freight — receiver confirmation required",
  },
];

const legendItems = [
  { label: "Current", color: "#60a5fa" },
  { label: "Pickup", color: "#fbbf24" },
  { label: "Dropoff", color: "#34d399" },
  { label: "Fuel", color: "#f87171" },
  { label: "Rest", color: "#94a3b8" },
];

export default function RouteSummary() {
  return (
    <section
      id="route-summary"
      className="bg-stone-900 py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with book-spine divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1 h-10 rounded-full bg-amber-500 flex-shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-mono mb-1">
              Trip Overview
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-100 tracking-tight leading-tight">
              Route Summary
            </h2>
          </div>
        </div>

        {/* Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {tripMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className={`
                  rounded-xl border p-5 cursor-default
                  bg-stone-800/60 border-stone-700/50
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5 hover:shadow-lg hover:border-stone-600/70
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                `}
              >
                <div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center mb-4
                    ${metric.bg} border ${metric.border}
                  `}
                >
                  <Icon weight="duotone" size={18} className={metric.accent} />
                </div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span
                    className={`font-mono text-3xl font-bold text-stone-100 leading-none tabular-nums`}
                  >
                    {metric.value}
                  </span>
                  <span className="font-mono text-xs text-stone-500">
                    {metric.unit}
                  </span>
                </div>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Route Map Panel */}
        <div className="rounded-xl border border-stone-700/50 bg-stone-800/60 overflow-hidden mb-6 shadow-md">
          {/* Map toolbar with book-spine divider */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-700/40 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-5 rounded-full bg-amber-500 flex-shrink-0" />
              <span className="font-serif text-base font-semibold text-stone-200">
                Planned Route
              </span>
              <span className="font-mono text-xs text-stone-500 ml-1">
                Dallas, TX → Fort Worth, TX → Memphis, TN
              </span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-mono text-xs text-stone-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map canvas */}
          <div className="relative" style={{ height: "320px" }}>
            {/* Grid background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(68,64,60,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(68,64,60,0.25) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <svg
              viewBox="0 0 900 320"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              {/* Route glow */}
              <path
                d="M 60 260 C 160 200, 200 120, 240 160 S 380 220, 480 200 S 600 120, 640 140 S 780 60, 840 80"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="10"
                opacity="0.07"
              />
              {/* Route line */}
              <path
                d="M 60 260 C 160 200, 200 120, 240 160 S 380 220, 480 200 S 600 120, 640 140 S 780 60, 840 80"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                opacity="0.7"
              />

              {/* Stop markers */}
              {routeStops.map((stop) => (
                <g key={stop.id}>
                  {stop.ring && (
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r={14}
                      fill="none"
                      stroke={stop.color}
                      strokeWidth="1.5"
                      opacity="0.35"
                    />
                  )}
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r={stop.type === "fuel" || stop.type === "rest" ? 5 : 7}
                    fill={stop.color}
                  />
                  {/* Label above or below based on position */}
                  <text
                    x={stop.x + (stop.x > 700 ? -10 : 14)}
                    y={stop.y - (stop.x > 700 ? 14 : -4)}
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="9.5"
                    fill="#a8a29e"
                    textAnchor={stop.x > 700 ? "end" : "start"}
                  >
                    {stop.label}
                  </text>
                  <text
                    x={stop.x + (stop.x > 700 ? -10 : 14)}
                    y={stop.y - (stop.x > 700 ? 14 : -4) + 12}
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="8.5"
                    fill="#78716c"
                    textAnchor={stop.x > 700 ? "end" : "start"}
                  >
                    {stop.sublabel}
                  </text>
                </g>
              ))}
            </svg>

            {/* Distance annotation */}
            <div className="absolute bottom-3 right-4 font-mono text-xs text-stone-600 bg-stone-900/70 px-2 py-1 rounded">
              Total: 612 mi · Est. 11.2 hrs
            </div>
          </div>
        </div>

        {/* Checkpoint Highlights */}
        <div>
          {/* Sub-header with book-spine divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-0.5 h-5 rounded-full bg-amber-500 flex-shrink-0" />
            <span className="font-serif text-lg font-semibold text-stone-200">
              Checkpoint Windows
            </span>
            <span className="font-mono text-xs text-stone-600 ml-1 hidden sm:inline">
              — service durations &amp; estimated arrival ranges
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checkpoints.map((cp) => {
              const Icon = cp.icon;
              return (
                <div
                  key={cp.id}
                  className={`
                    rounded-xl border p-6 cursor-default
                    bg-stone-800/60 border-stone-700/50
                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5 hover:shadow-lg hover:border-stone-600/70
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon block */}
                    <div
                      className={`
                        w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                        ${cp.bg} border ${cp.border}
                      `}
                    >
                      <Icon weight="duotone" size={22} className={cp.accent} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Type + mile marker */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className={`font-serif text-base font-semibold text-stone-200`}
                        >
                          {cp.type}
                        </span>
                        <span
                          className={`font-mono text-xs px-2 py-0.5 rounded-full ${cp.bg} ${cp.accent} border ${cp.border}`}
                        >
                          {cp.mileMarker}
                        </span>
                      </div>

                      {/* Location */}
                      <p className="font-mono text-xs text-stone-500 uppercase tracking-wide mb-3">
                        {cp.location}
                      </p>

                      {/* Duration + window row */}
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <Clock
                            weight="duotone"
                            size={13}
                            className="text-stone-500"
                          />
                          <span className="font-mono text-xs text-stone-500">
                            Service duration
                          </span>
                          <span
                            className={`font-mono text-sm font-bold ${cp.accent}`}
                          >
                            {cp.duration}
                          </span>
                        </div>
                        <div className="w-px h-3 bg-stone-700 hidden sm:block" />
                        <div className="flex items-center gap-1.5">
                          <ArrowRight
                            weight="duotone"
                            size={13}
                            className="text-stone-500"
                          />
                          <span className="font-mono text-xs text-stone-500">
                            Est. window
                          </span>
                          <span className="font-mono text-sm font-bold text-stone-300">
                            {cp.window}
                          </span>
                        </div>
                      </div>

                      {/* Note */}
                      <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-700/40 pt-3">
                        {cp.note}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
