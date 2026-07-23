import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  ArrowRight,
  Truck,
  Clock,
  GasPump,
  Coffee,
  Package,
  CheckCircle,
  Warning,
  MapTrifold,
  Timer,
  Path,
} from "@phosphor-icons/react";

const stopSchedule = [
  {
    id: "pickup",
    type: "Pickup",
    location: "Fort Worth, TX",
    mile: "MI 0",
    detail: "Load freight — dock bay 4",
    duration: "1h 00m",
    window: "08:15 – 09:15",
    colorClass: "text-amber-400",
    bgClass: "bg-amber-400/10",
    icon: Package,
  },
  {
    id: "fuel",
    type: "Fuel Stop",
    location: "Sunoco Travel Plaza — I‑30 E, Texarkana",
    mile: "MI 268",
    detail: "Refuel and driver check",
    duration: "0h 30m",
    window: "13:45 – 14:15",
    colorClass: "text-red-400",
    bgClass: "bg-red-400/10",
    icon: GasPump,
  },
  {
    id: "rest",
    type: "30‑min Break",
    location: "I‑30 Rest Area, AR",
    mile: "MI 402",
    detail: "Required after 8 hrs driving — FMCSA §395.3",
    duration: "0h 30m",
    window: "16:30 – 17:00",
    colorClass: "text-stone-400",
    bgClass: "bg-stone-400/10",
    icon: Coffee,
  },
  {
    id: "dropoff",
    type: "Dropoff",
    location: "Memphis, TN",
    mile: "MI 612",
    detail: "Unload freight — receiving dock",
    duration: "1h 00m",
    window: "19:45 – 20:45",
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-400/10",
    icon: CheckCircle,
  },
];

const eldDays = [
  {
    day: "Day 1",
    date: "Tue, Jul 21",
    route: "Dallas, TX → Texarkana, TX",
    miles: "268 mi driven",
    totals: [
      { label: "Off Duty", value: "7.0h" },
      { label: "Driving", value: "14.0h" },
      { label: "On Duty (ND)", value: "2.0h" },
      { label: "Sleeper", value: "1.0h" },
    ],
    lanes: [
      {
        label: "Off",
        color: "bg-stone-600",
        segments: [
          { left: "0%", width: "29.1%" },
          { left: "96%", width: "4%" },
        ],
      },
      {
        label: "Sleeper",
        color: "bg-blue-500",
        segments: [],
      },
      {
        label: "Driving",
        color: "bg-amber-400",
        segments: [
          { left: "33.3%", width: "41.7%" },
          { left: "77.1%", width: "16.7%" },
        ],
      },
      {
        label: "On Duty",
        color: "bg-emerald-400",
        segments: [
          { left: "29.1%", width: "4.2%" },
          { left: "75%", width: "2.1%" },
          { left: "93.7%", width: "2.3%" },
        ],
      },
    ],
  },
  {
    day: "Day 2",
    date: "Wed, Jul 22",
    route: "Texarkana, TX → Memphis, TN",
    miles: "344 mi driven",
    totals: [
      { label: "Off Duty", value: "9.5h" },
      { label: "Driving", value: "12.0h" },
      { label: "On Duty (ND)", value: "2.5h" },
      { label: "Sleeper", value: "0.0h" },
    ],
    lanes: [
      {
        label: "Off",
        color: "bg-stone-600",
        segments: [
          { left: "0%", width: "29.1%" },
          { left: "87.5%", width: "12.5%" },
        ],
      },
      {
        label: "Sleeper",
        color: "bg-blue-500",
        segments: [],
      },
      {
        label: "Driving",
        color: "bg-amber-400",
        segments: [
          { left: "33.3%", width: "29.1%" },
          { left: "64.5%", width: "20.8%" },
        ],
      },
      {
        label: "On Duty",
        color: "bg-emerald-400",
        segments: [
          { left: "29.1%", width: "4.2%" },
          { left: "62.4%", width: "2.1%" },
          { left: "85.3%", width: "2.2%" },
        ],
      },
    ],
  },
];

const hourLabels = [
  "12A",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12P",
  "2",
  "4",
  "6",
  "8",
  "10",
];

export default function TripPlanning() {
  const [currentLoc, setCurrentLoc] = useState("Dallas, TX");
  const [pickupLoc, setPickupLoc] = useState("Fort Worth, TX");
  const [dropoffLoc, setDropoffLoc] = useState("Memphis, TN");
  const [cycleHours, setCycleHours] = useState("34.5");
  const [routePlanned, setRoutePlanned] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);

  const handlePlanRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanning(true);
    setTimeout(() => {
      setIsPlanning(false);
      setRoutePlanned(true);
    }, 800);
  };

  const usedHours = parseFloat(cycleHours) || 0;
  const remainingHours = Math.max(0, 70 - usedHours).toFixed(1);
  const cyclePercent = Math.min((usedHours / 70) * 100, 100);

  return (
    <section
      id="trip-planning"
      className="bg-stone-950 min-h-screen py-12 px-4 md:px-8 lg:px-16"
    >
      {/* Section eyebrow */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 bg-amber-400 rounded-full" />
          <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
            Trip Intake — FMCSA 70‑hr/8‑day Cycle
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-stone-100 tracking-tight leading-tight max-w-2xl">
          Plan a compliant trip from current position to final dropoff
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
        {/* ── LEFT: Intake Form ── */}
        <div className="lg:sticky lg:top-6">
          {/* Book-spine card header */}
          <div className="flex items-stretch rounded-t-xl overflow-hidden border border-stone-700/60 border-b-0">
            <div className="w-2 bg-amber-400/80 flex-shrink-0" />
            <div className="flex-1 bg-stone-900 px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-0.5">
                  Dispatch Form
                </p>
                <p className="font-serif text-base text-stone-200 font-semibold">
                  New Trip
                </p>
              </div>
              <Truck weight="duotone" className="text-amber-400 w-5 h-5" />
            </div>
          </div>

          <form
            onSubmit={handlePlanRoute}
            className="bg-stone-900 border border-stone-700/60 border-t-0 rounded-b-xl p-5 space-y-5"
          >
            {/* Route thread visual */}
            <div className="relative space-y-4">
              {/* Thread line */}
              <div className="absolute left-[11px] top-8 bottom-8 w-px border-l border-dashed border-stone-600 z-0" />

              {/* Current Location */}
              <div className="relative z-10">
                <Label className="flex items-center gap-2 text-xs text-stone-400 font-mono uppercase tracking-wide mb-2">
                  <span className="w-3 h-3 rounded-full border-2 border-blue-400 bg-stone-900 flex-shrink-0" />
                  Current Location
                  <span className="text-amber-400 text-xs">*</span>
                </Label>
                <Input
                  value={currentLoc}
                  onChange={(e) => setCurrentLoc(e.target.value)}
                  placeholder="e.g. Dallas, TX"
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 font-mono text-sm rounded-lg focus-visible:ring-amber-400/50 focus-visible:border-amber-400/60 transition-all duration-200"
                />
              </div>

              {/* Pickup Location */}
              <div className="relative z-10">
                <Label className="flex items-center gap-2 text-xs text-stone-400 font-mono uppercase tracking-wide mb-2">
                  <span className="w-3 h-3 rounded-full border-2 border-amber-400 bg-stone-900 flex-shrink-0" />
                  Pickup Location
                  <span className="text-amber-400 text-xs">*</span>
                </Label>
                <Input
                  value={pickupLoc}
                  onChange={(e) => setPickupLoc(e.target.value)}
                  placeholder="e.g. Fort Worth, TX"
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 font-mono text-sm rounded-lg focus-visible:ring-amber-400/50 focus-visible:border-amber-400/60 transition-all duration-200"
                />
              </div>

              {/* Dropoff Location */}
              <div className="relative z-10">
                <Label className="flex items-center gap-2 text-xs text-stone-400 font-mono uppercase tracking-wide mb-2">
                  <span className="w-3 h-3 rounded-full border-2 border-emerald-400 bg-stone-900 flex-shrink-0" />
                  Dropoff Location
                  <span className="text-amber-400 text-xs">*</span>
                </Label>
                <Input
                  value={dropoffLoc}
                  onChange={(e) => setDropoffLoc(e.target.value)}
                  placeholder="e.g. Memphis, TN"
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 font-mono text-sm rounded-lg focus-visible:ring-amber-400/50 focus-visible:border-amber-400/60 transition-all duration-200"
                />
              </div>
            </div>

            <Separator className="bg-stone-800" />

            {/* Cycle Hours */}
            <div>
              <Label className="flex items-center gap-2 text-xs text-stone-400 font-mono uppercase tracking-wide mb-2">
                <Timer
                  weight="duotone"
                  className="w-3.5 h-3.5 text-stone-500"
                />
                Current Cycle Used
                <span className="text-amber-400 text-xs">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  min={0}
                  max={70}
                  step={0.5}
                  value={cycleHours}
                  onChange={(e) => setCycleHours(e.target.value)}
                  placeholder="0"
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 font-mono text-sm rounded-lg pr-20 focus-visible:ring-amber-400/50 focus-visible:border-amber-400/60 transition-all duration-200"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-stone-500 pointer-events-none">
                  hrs / 70
                </span>
              </div>
              {/* Mini cycle bar */}
              <div className="mt-2.5 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    cyclePercent > 85
                      ? "bg-red-400"
                      : cyclePercent > 60
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                  }`}
                  style={{ width: `${cyclePercent}%` }}
                />
              </div>
              <p className="font-mono text-xs text-stone-600 mt-1.5">
                {remainingHours} hrs remaining in cycle
              </p>
            </div>

            <Button
              type="submit"
              disabled={isPlanning}
              className="w-full bg-amber-400 text-stone-950 hover:bg-amber-300 font-semibold text-sm rounded-lg py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPlanning ? (
                <>
                  <span className="font-mono">Calculating route…</span>
                </>
              ) : (
                <>
                  <Path weight="duotone" className="w-4 h-4 mr-2" />
                  Plan Route
                  <ArrowRight weight="bold" className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-800 pt-4 font-mono">
              Route, fuel and rest stops are calculated against FMCSA
              70‑hr/8‑day cycle rules. Logs are generated per §395.8.
            </p>
          </form>
        </div>

        {/* ── RIGHT: Results Panel ── */}
        <div>
          {!routePlanned ? (
            /* Empty State */
            <div className="border border-dashed border-stone-700/60 rounded-xl p-16 text-center bg-stone-900/30 flex flex-col items-center">
              <MapTrifold
                weight="duotone"
                className="w-12 h-12 text-stone-600 mb-5"
              />
              <h3 className="font-serif text-lg text-stone-400 mb-2 font-semibold">
                No route planned yet
              </h3>
              <p className="text-sm text-stone-600 max-w-xs leading-relaxed font-mono">
                Fill in current, pickup and dropoff locations plus your cycle
                hours, then plan the route to see the map, stops and ELD logs
                here.
              </p>
            </div>
          ) : (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
              {/* ── Route Map Card ── */}
              <div className="rounded-xl overflow-hidden border border-stone-700/60 bg-stone-900">
                {/* Book-spine header */}
                <div className="flex items-stretch border-b border-stone-700/60">
                  <div className="w-2 bg-blue-500/70 flex-shrink-0" />
                  <div className="flex-1 px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <p className="font-serif text-sm font-semibold text-stone-200">
                        Route Map
                      </p>
                      <Badge className="font-mono text-xs bg-stone-800 text-stone-400 border-stone-700 px-2 py-0.5">
                        612 mi
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      {[
                        { label: "Current", color: "bg-blue-400" },
                        { label: "Pickup", color: "bg-amber-400" },
                        { label: "Dropoff", color: "bg-emerald-400" },
                        { label: "Fuel", color: "bg-red-400" },
                        { label: "Rest", color: "bg-stone-500" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="hidden sm:flex items-center gap-1.5"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${item.color}`}
                          />
                          <span className="font-mono text-xs text-stone-500">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Map canvas */}
                <div className="relative h-64 bg-stone-950/60 overflow-hidden">
                  {/* Grid lines */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="#44403c"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  <svg
                    viewBox="0 0 900 260"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Route glow */}
                    <path
                      d="M 60 200 C 220 200, 240 70, 380 70 S 560 180, 700 120 S 800 50, 840 55"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="10"
                      opacity="0.07"
                    />
                    {/* Route line */}
                    <path
                      d="M 60 200 C 220 200, 240 70, 380 70 S 560 180, 700 120 S 800 50, 840 55"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="2.5"
                      opacity="0.7"
                      strokeDasharray="6 3"
                    />
                    {/* Current — Dallas */}
                    <circle cx="60" cy="200" r="6" fill="#60a5fa" />
                    <circle
                      cx="60"
                      cy="200"
                      r="11"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="1"
                      opacity="0.35"
                    />
                    <text
                      x="76"
                      y="204"
                      fontFamily="monospace"
                      fontSize="9"
                      fill="#78716c"
                    >
                      DALLAS, TX
                    </text>
                    {/* Pickup — Fort Worth */}
                    <circle cx="380" cy="70" r="6" fill="#fbbf24" />
                    <circle
                      cx="380"
                      cy="70"
                      r="11"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1"
                      opacity="0.35"
                    />
                    <text
                      x="396"
                      y="74"
                      fontFamily="monospace"
                      fontSize="9"
                      fill="#78716c"
                    >
                      FORT WORTH · PICKUP
                    </text>
                    {/* Fuel */}
                    <circle cx="560" cy="168" r="5" fill="#f87171" />
                    <text
                      x="572"
                      y="172"
                      fontFamily="monospace"
                      fontSize="9"
                      fill="#78716c"
                    >
                      FUEL · MI 268
                    </text>
                    {/* Rest */}
                    <circle cx="700" cy="120" r="5" fill="#78716c" />
                    <text
                      x="712"
                      y="124"
                      fontFamily="monospace"
                      fontSize="9"
                      fill="#78716c"
                    >
                      REST · MI 402
                    </text>
                    {/* Dropoff — Memphis */}
                    <circle cx="840" cy="55" r="6" fill="#34d399" />
                    <circle
                      cx="840"
                      cy="55"
                      r="11"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="1"
                      opacity="0.35"
                    />
                    <text
                      x="810"
                      y="40"
                      fontFamily="monospace"
                      fontSize="9"
                      fill="#78716c"
                    >
                      MEMPHIS · DROPOFF
                    </text>
                  </svg>
                </div>
              </div>

              {/* ── Trip Summary Strip ── */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Distance",
                    value: "612",
                    unit: "mi",
                    icon: MapPin,
                    color: "text-blue-400",
                    bg: "bg-blue-400/10",
                  },
                  {
                    label: "Trip Duration",
                    value: "11.2",
                    unit: "hrs",
                    icon: Clock,
                    color: "text-amber-400",
                    bg: "bg-amber-400/10",
                  },
                  {
                    label: "Fuel Stops",
                    value: "1",
                    unit: "",
                    icon: GasPump,
                    color: "text-red-400",
                    bg: "bg-red-400/10",
                  },
                  {
                    label: "Rest Breaks",
                    value: "1",
                    unit: "×30m",
                    icon: Coffee,
                    color: "text-stone-400",
                    bg: "bg-stone-400/10",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-stone-900 border border-stone-700/60 rounded-xl p-4 hover:-translate-y-0.5 hover:border-stone-600 hover:shadow-md transition-all duration-200 cursor-default"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}
                    >
                      <stat.icon
                        weight="duotone"
                        className={`w-4 h-4 ${stat.color}`}
                      />
                    </div>
                    <div className="font-mono text-2xl font-bold text-stone-100 leading-none">
                      {stat.value}
                      {stat.unit && (
                        <span className="text-sm text-stone-500 font-normal ml-1">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 mt-1.5 font-mono uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Fuel & Rest Stops ── */}
              <div className="rounded-xl overflow-hidden border border-stone-700/60 bg-stone-900">
                <div className="flex items-stretch border-b border-stone-700/60">
                  <div className="w-2 bg-amber-400/70 flex-shrink-0" />
                  <div className="flex-1 px-5 py-3.5">
                    <p className="font-serif text-sm font-semibold text-stone-200">
                      Fuel &amp; Rest Stops
                    </p>
                    <p className="font-mono text-xs text-stone-600 mt-0.5">
                      Scheduled waypoints along route
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-stone-800/60">
                  {stopSchedule.map((stop) => (
                    <div
                      key={stop.id}
                      className="flex items-start gap-4 px-5 py-4 hover:bg-stone-800/40 transition-all duration-200 cursor-default group"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg ${stop.bgClass} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <stop.icon
                          weight="duotone"
                          className={`w-4 h-4 ${stop.colorClass}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-stone-200 group-hover:text-stone-100 transition-colors duration-200">
                            {stop.type}
                          </span>
                          <span className="font-mono text-xs text-stone-600">
                            {stop.mile}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5 font-mono">
                          {stop.location}
                        </p>
                        <p className="text-xs text-stone-600 mt-0.5">
                          {stop.detail}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-mono text-sm text-stone-300 font-semibold">
                          {stop.duration}
                        </div>
                        <div className="font-mono text-xs text-stone-600 mt-0.5">
                          {stop.window}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Pickup & Dropoff Timing ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Pickup Duration",
                    location: pickupLoc,
                    duration: "1h 00m",
                    window: "Est. window 08:15 – 09:15",
                    icon: Package,
                    color: "text-amber-400",
                    bg: "bg-amber-400/10",
                    spine: "bg-amber-400/70",
                  },
                  {
                    label: "Dropoff Duration",
                    location: dropoffLoc,
                    duration: "1h 00m",
                    window: "Est. window 19:45 – 20:45",
                    icon: CheckCircle,
                    color: "text-emerald-400",
                    bg: "bg-emerald-400/10",
                    spine: "bg-emerald-400/70",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl overflow-hidden border border-stone-700/60 bg-stone-900 flex items-stretch hover:-translate-y-0.5 hover:shadow-md hover:border-stone-600 transition-all duration-200 cursor-default"
                  >
                    <div className={`w-2 ${item.spine} flex-shrink-0`} />
                    <div className="flex items-center gap-4 p-4 flex-1">
                      <div
                        className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <item.icon
                          weight="duotone"
                          className={`w-5 h-5 ${item.color}`}
                        />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-stone-500 uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-mono text-xs text-stone-600 mb-1">
                          {item.location}
                        </p>
                        <p className="font-mono text-xl font-bold text-stone-100 leading-none">
                          {item.duration}
                        </p>
                        <p className="font-mono text-xs text-stone-600 mt-1">
                          {item.window}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Daily ELD Logs ── */}
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-stone-200">
                      Daily ELD Logs
                    </h3>
                    <p className="font-mono text-xs text-stone-600 mt-0.5">
                      Auto‑generated duty status timeline — §395.8
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    {[
                      { label: "Off Duty", color: "bg-stone-600" },
                      { label: "Sleeper", color: "bg-blue-500" },
                      { label: "Driving", color: "bg-amber-400" },
                      { label: "On Duty", color: "bg-emerald-400" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-1.5"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${item.color}`}
                        />
                        <span className="font-mono text-xs text-stone-500">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {eldDays.map((day) => (
                    <div
                      key={day.day}
                      className="rounded-xl overflow-hidden border border-stone-700/60 bg-stone-900"
                    >
                      {/* Day header — book spine */}
                      <div className="flex items-stretch border-b border-stone-800/60">
                        <div className="w-2 bg-stone-600/60 flex-shrink-0" />
                        <div className="flex-1 px-5 py-3.5 flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-serif text-sm font-semibold text-stone-200">
                              {day.day} — {day.date}
                            </p>
                            <p className="font-mono text-xs text-stone-600 mt-0.5">
                              {day.route}
                            </p>
                          </div>
                          <Badge className="font-mono text-xs bg-stone-800 text-stone-400 border-stone-700">
                            {day.miles}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5">
                        {/* Hour axis */}
                        <div className="grid grid-cols-[72px_1fr] mb-1.5">
                          <div />
                          <div className="grid grid-cols-12">
                            {hourLabels.map((h, i) => (
                              <span
                                key={i}
                                className="font-mono text-[9px] text-stone-700"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* ELD lanes */}
                        <div className="border border-stone-800 rounded-lg overflow-hidden">
                          {day.lanes.map((lane, li) => (
                            <div
                              key={lane.label}
                              className={`grid grid-cols-[72px_1fr] ${
                                li < day.lanes.length - 1
                                  ? "border-b border-stone-800"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center gap-2 px-3 py-2.5 bg-stone-950/40 border-r border-stone-800">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${lane.color} flex-shrink-0`}
                                />
                                <span className="font-mono text-[10px] text-stone-500">
                                  {lane.label}
                                </span>
                              </div>
                              <div className="relative h-8 bg-stone-950/20">
                                {lane.segments.map((seg, si) => (
                                  <div
                                    key={si}
                                    className={`absolute top-1.5 h-5 rounded-sm ${lane.color} opacity-80`}
                                    style={{
                                      left: seg.left,
                                      width: seg.width,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Totals */}
                        <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-4 pt-4 border-t border-stone-800/60">
                          {day.totals.map((t) => (
                            <div
                              key={t.label}
                              className="font-mono text-xs text-stone-500"
                            >
                              {t.label}{" "}
                              <span className="text-stone-300 font-semibold">
                                {t.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance notice */}
              <div className="flex items-start gap-3 bg-stone-900/50 border border-stone-700/40 rounded-xl p-4">
                <Warning
                  weight="duotone"
                  className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                />
                <p className="font-mono text-xs text-stone-600 leading-relaxed">
                  Distances, timings and ELD logs shown are calculated
                  estimates. Verify all duty status entries against your
                  certified ELD device before submission. FMCSA §395.8
                  compliance is the driver's responsibility.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
