import {
  MapPin,
  Gauge,
  Drop,
  Coffee,
  Package,
  CheckCircle,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const complianceZones = [
  {
    label: "Safe",
    range: "0 – 42 hrs",
    colorClass: "bg-green-500",
    textClass: "text-green-700",
  },
  {
    label: "Caution",
    range: "42 – 60 hrs",
    colorClass: "bg-amber-500",
    textClass: "text-amber-700",
  },
  {
    label: "Critical",
    range: "60 – 70 hrs",
    colorClass: "bg-red-500",
    textClass: "text-red-700",
  },
];

const stopLedger = [
  {
    id: "pickup",
    type: "Pickup",
    location: "Fort Worth, TX",
    detail: "Load freight — dock bay 4",
    mile: "MI 000",
    duration: "1h 00m",
    icon: Package,
    badgeLabel: "PICKUP",
    accentClass: "bg-amber-100 text-amber-800 border-amber-300",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    borderAccent: "border-l-amber-500",
  },
  {
    id: "fuel",
    type: "Fuel Stop",
    location: "Sunoco Travel Plaza — I‑30 E, Texarkana",
    detail: "Refuel and log stop",
    mile: "MI 268",
    duration: "0h 30m",
    icon: Drop,
    badgeLabel: "FUEL",
    accentClass: "bg-red-100 text-red-800 border-red-300",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
    borderAccent: "border-l-red-500",
  },
  {
    id: "break",
    type: "30‑Min Break",
    location: "I‑30 Rest Area, AR",
    detail: "Required after 8 hrs driving — FMCSA §395.3",
    mile: "MI 402",
    duration: "0h 30m",
    icon: Coffee,
    badgeLabel: "REST",
    accentClass: "bg-stone-200 text-stone-700 border-stone-300",
    iconBg: "bg-stone-200",
    iconColor: "text-stone-600",
    borderAccent: "border-l-stone-400",
  },
  {
    id: "dropoff",
    type: "Dropoff",
    location: "Memphis, TN",
    detail: "Unload freight — confirm delivery receipt",
    mile: "MI 612",
    duration: "1h 00m",
    icon: CheckCircle,
    badgeLabel: "DROPOFF",
    accentClass: "bg-green-100 text-green-800 border-green-300",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    borderAccent: "border-l-green-500",
  },
];

const cycleUsed = 34.5;
const cycleTotal = 70;
const cycleRemaining = cycleTotal - cycleUsed;
const usedPercent = (cycleUsed / cycleTotal) * 100;

// SVG arc helpers for the half-gauge
const RADIUS = 72;
const CX = 100;
const CY = 100;
const STROKE = 13;
const CIRCUMFERENCE = Math.PI * RADIUS; // half circle

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 180) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function halfArcPath(cx: number, cy: number, r: number) {
  const start = polarToCartesian(cx, cy, r, 0);
  const end = polarToCartesian(cx, cy, r, 180);
  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
}

export default function StopSchedule() {
  const arcPath = halfArcPath(CX, CY, RADIUS);
  const filledDash = (usedPercent / 100) * CIRCUMFERENCE;
  const gapDash = CIRCUMFERENCE - filledDash;

  // Zone color for gauge fill
  const gaugeStrokeColor =
    cycleUsed <= 42 ? "#22c55e" : cycleUsed <= 60 ? "#f59e0b" : "#ef4444";

  return (
    <section
      id="stop-schedule"
      className="bg-amber-50 py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-700 font-mono mb-2">
            Compliance &amp; Routing
          </p>
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight leading-tight text-stone-900">
            Cycle Hours &amp; Stop Schedule
          </h2>
        </div>

        {/* Split pane */}
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-start">
          {/* ── LEFT: Cycle Gauge Card ── */}
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
            {/* Book-spine card header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-200 bg-stone-50">
              <span className="block w-1.5 h-6 rounded-sm bg-amber-500 flex-shrink-0" />
              <div>
                <p className="font-heading text-sm font-semibold text-stone-800 leading-snug">
                  Cycle Hours
                </p>
                <p className="font-mono text-xs text-stone-400 mt-0.5">
                  70‑hr / 8‑day FMCSA
                </p>
              </div>
              <Gauge
                weight="duotone"
                className="ml-auto text-amber-500"
                size={20}
              />
            </div>

            {/* Gauge */}
            <div className="flex flex-col items-center px-6 pt-6 pb-4">
              <svg
                viewBox="0 0 200 110"
                className="w-full max-w-[220px]"
                aria-label="Cycle hours gauge"
              >
                {/* Track */}
                <path
                  d={arcPath}
                  fill="none"
                  stroke="#e7e5e4"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                />
                {/* Fill */}
                <path
                  d={arcPath}
                  fill="none"
                  stroke={gaugeStrokeColor}
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={`${filledDash} ${gapDash}`}
                  strokeDashoffset={0}
                />
                {/* Center label */}
                <text
                  x={CX}
                  y={88}
                  textAnchor="middle"
                  className="font-mono"
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: 22,
                    fill: "#1c1917",
                  }}
                >
                  {cycleUsed}
                </text>
                <text
                  x={CX}
                  y={103}
                  textAnchor="middle"
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    fill: "#78716c",
                  }}
                >
                  / {cycleTotal} hrs used
                </text>
              </svg>

              {/* Remaining callout */}
              <div className="mt-3 text-center">
                <p className="font-mono text-2xl font-bold text-stone-800 leading-none">
                  {cycleRemaining.toFixed(1)}
                  <span className="text-sm font-normal text-stone-400 ml-1">
                    hrs remaining
                  </span>
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Resets after 34‑hr restart
                </p>
              </div>
            </div>

            <Separator className="bg-stone-100" />

            {/* Compliance zones */}
            <div className="px-5 py-4 space-y-2.5">
              <p className="text-xs uppercase tracking-widest text-stone-400 font-mono mb-3">
                Compliance Zones
              </p>
              {complianceZones.map((zone) => (
                <div key={zone.label} className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${zone.colorClass}`}
                  />
                  <span className="font-mono text-xs text-stone-600 flex-1">
                    {zone.range}
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full border ${zone.accentClass ?? ""} ${zone.textClass}`}
                    style={{ background: "transparent" }}
                  >
                    {zone.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Stop Ledger Card ── */}
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
            {/* Book-spine card header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-200 bg-stone-50">
              <span className="block w-1.5 h-6 rounded-sm bg-stone-700 flex-shrink-0" />
              <div>
                <p className="font-heading text-sm font-semibold text-stone-800 leading-snug">
                  Fuel &amp; Rest Stops
                </p>
                <p className="font-mono text-xs text-stone-400 mt-0.5">
                  Dallas, TX → Memphis, TN · 612 mi
                </p>
              </div>
              <MapPin
                weight="duotone"
                className="ml-auto text-stone-400"
                size={20}
              />
            </div>

            {/* Ledger rows */}
            <div className="divide-y divide-stone-100">
              {stopLedger.map((stop, idx) => {
                const Icon = stop.icon;
                return (
                  <div
                    key={stop.id}
                    className={`
                      flex items-start gap-4 px-5 py-4
                      border-l-4 ${stop.borderAccent}
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5 hover:shadow-md hover:bg-amber-50
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    `}
                  >
                    {/* Step number + icon */}
                    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${stop.iconBg} ${stop.iconColor}`}
                      >
                        <Icon weight="duotone" size={18} />
                      </div>
                      <span className="font-mono text-[10px] text-stone-300 leading-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-heading text-sm font-semibold text-stone-800 leading-snug">
                          {stop.type}
                        </span>
                        <Badge
                          className={`font-mono text-[10px] px-2 py-0 border ${stop.accentClass} rounded-full`}
                          variant="outline"
                        >
                          {stop.badgeLabel}
                        </Badge>
                      </div>
                      <p className="text-sm text-stone-600 leading-snug truncate">
                        {stop.location}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5 leading-snug">
                        {stop.detail}
                      </p>
                    </div>

                    {/* Right: mile + duration */}
                    <div className="flex-shrink-0 text-right">
                      <p className="font-mono text-xs text-stone-400 leading-none mb-1">
                        {stop.mile}
                      </p>
                      <p className="font-mono text-sm font-semibold text-stone-700 leading-none">
                        {stop.duration}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ledger footer totals */}
            <div className="px-5 py-4 bg-stone-50 border-t border-stone-200 flex flex-wrap gap-x-8 gap-y-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-0.5">
                  Total Drive
                </p>
                <p className="font-mono text-base font-bold text-stone-800">
                  9h 42m
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-0.5">
                  Stop Time
                </p>
                <p className="font-mono text-base font-bold text-stone-800">
                  3h 00m
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-0.5">
                  Trip Total
                </p>
                <p className="font-mono text-base font-bold text-stone-800">
                  11h 12m
                </p>
              </div>
              <div className="ml-auto">
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-0.5">
                  Cycle After Trip
                </p>
                <p className="font-mono text-base font-bold text-amber-700">
                  {(cycleUsed + 9.7).toFixed(1)}&nbsp;/&nbsp;70 hrs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
