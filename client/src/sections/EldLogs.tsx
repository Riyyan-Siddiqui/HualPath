import { Badge } from "../components/ui/badge";
import { Moon, Truck, Briefcase } from "@phosphor-icons/react";

const statusKey = [
  {
    label: "Off Duty",
    color: "bg-stone-600",
    textColor: "text-stone-400",
    icon: Moon,
  },
  {
    label: "Sleeper",
    color: "bg-blue-700",
    textColor: "text-blue-400",
    icon: Moon,
  },
  {
    label: "Driving",
    color: "bg-amber-600",
    textColor: "text-amber-400",
    icon: Truck,
  },
  {
    label: "On Duty",
    color: "bg-emerald-700",
    textColor: "text-emerald-400",
    icon: Briefcase,
  },
];

const hourLabels = [
  "12A",
  "",
  "2",
  "",
  "4",
  "",
  "6",
  "",
  "8",
  "",
  "10",
  "",
  "12P",
  "",
  "2",
  "",
  "4",
  "",
  "6",
  "",
  "8",
  "",
  "10",
  "",
];

const dayCards = [
  {
    day: "Day 1",
    date: "Tue, Jul 21",
    route: "Dallas, TX → Texarkana, TX",
    miles: "268 mi driven",
    lanes: [
      {
        status: "Off Duty",
        color: "bg-stone-600",
        dotColor: "bg-stone-500",
        segments: [
          { left: "0%", width: "29.1%" },
          { left: "96%", width: "4%" },
        ],
      },
      {
        status: "Sleeper",
        color: "bg-blue-700",
        dotColor: "bg-blue-500",
        segments: [],
      },
      {
        status: "Driving",
        color: "bg-amber-600",
        dotColor: "bg-amber-500",
        segments: [
          { left: "33.3%", width: "41.7%" },
          { left: "77.1%", width: "16.7%" },
        ],
      },
      {
        status: "On Duty",
        color: "bg-emerald-700",
        dotColor: "bg-emerald-500",
        segments: [
          { left: "29.1%", width: "4.2%" },
          { left: "75%", width: "2.1%" },
          { left: "93.7%", width: "2.3%" },
        ],
      },
    ],
    totals: [
      { label: "Off Duty", value: "7.0h" },
      { label: "Driving", value: "14.0h" },
      { label: "On Duty (not driving)", value: "2.0h" },
      { label: "Sleeper", value: "1.0h" },
    ],
  },
  {
    day: "Day 2",
    date: "Wed, Jul 22",
    route: "Texarkana, TX → Memphis, TN",
    miles: "344 mi driven",
    lanes: [
      {
        status: "Off Duty",
        color: "bg-stone-600",
        dotColor: "bg-stone-500",
        segments: [
          { left: "0%", width: "29.1%" },
          { left: "87.5%", width: "12.5%" },
        ],
      },
      {
        status: "Sleeper",
        color: "bg-blue-700",
        dotColor: "bg-blue-500",
        segments: [],
      },
      {
        status: "Driving",
        color: "bg-amber-600",
        dotColor: "bg-amber-500",
        segments: [
          { left: "33.3%", width: "29.1%" },
          { left: "64.5%", width: "20.8%" },
        ],
      },
      {
        status: "On Duty",
        color: "bg-emerald-700",
        dotColor: "bg-emerald-500",
        segments: [
          { left: "29.1%", width: "4.2%" },
          { left: "62.4%", width: "2.1%" },
          { left: "85.3%", width: "2.2%" },
        ],
      },
    ],
    totals: [
      { label: "Off Duty", value: "9.5h" },
      { label: "Driving", value: "12.0h" },
      { label: "On Duty (not driving)", value: "2.5h" },
      { label: "Sleeper", value: "0.0h" },
    ],
  },
];

export default function EldLogs() {
  return (
    <section id="eld-logs" className="bg-stone-900 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="flex items-start gap-4">
            {/* Book-spine accent */}
            <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
              <div className="w-1 h-8 rounded-full bg-amber-600 opacity-90" />
              <div className="w-1 h-3 rounded-full bg-amber-800 opacity-60" />
              <div className="w-1 h-1.5 rounded-full bg-amber-900 opacity-40" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-stone-500 font-mono mb-2">
                FMCSA 70-hr / 8-day Cycle
              </span>
              <h2 className="font-heading text-3xl md:text-4xl tracking-tight leading-tight text-stone-100">
                Daily ELD Logs
              </h2>
              <p className="text-stone-400 text-sm mt-2">
                Auto-generated duty status timeline for each day of the trip
              </p>
            </div>
          </div>

          {/* Status Key */}
          <div className="flex flex-wrap gap-3">
            {statusKey.map(({ label, color, textColor }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-stone-800 border border-stone-700 rounded-md px-3 py-1.5"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color}`}
                />
                <span className={`font-mono text-xs ${textColor}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Day Cards */}
        <div className="flex flex-col gap-6">
          {dayCards.map((card, cardIdx) => (
            <div
              key={cardIdx}
              className="bg-stone-800 border border-stone-700 rounded-xl p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:border-stone-600 group"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-0.5 h-10 rounded-full bg-amber-700 opacity-70 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-heading text-base md:text-lg leading-snug text-stone-100">
                        {card.day}
                      </h3>
                      <span className="font-mono text-xs text-stone-500 bg-stone-900 border border-stone-700 rounded px-2 py-0.5">
                        {card.date}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm mt-1">{card.route}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="font-mono text-xs text-amber-400 border-amber-800 bg-amber-950 self-start sm:self-auto whitespace-nowrap"
                >
                  {card.miles}
                </Badge>
              </div>

              {/* Timeline Grid */}
              <div className="overflow-x-auto">
                <div className="min-w-[560px]">
                  {/* Hour axis */}
                  <div
                    className="grid mb-2"
                    style={{ gridTemplateColumns: "80px repeat(24, 1fr)" }}
                  >
                    <span />
                    {hourLabels.map((label, i) => (
                      <span
                        key={i}
                        className="font-mono text-[9px] text-stone-600 text-left"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Lane rows */}
                  <div className="border border-stone-700 rounded-lg overflow-hidden">
                    {card.lanes.map((lane, laneIdx) => (
                      <div
                        key={laneIdx}
                        className={`grid border-stone-700 ${laneIdx < card.lanes.length - 1 ? "border-b" : ""}`}
                        style={{ gridTemplateColumns: "80px 1fr" }}
                      >
                        {/* Lane label */}
                        <div className="flex items-center gap-2 px-3 py-2.5 bg-stone-900 border-r border-stone-700">
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${lane.dotColor}`}
                          />
                          <span className="font-mono text-[10px] text-stone-400 whitespace-nowrap">
                            {lane.status}
                          </span>
                        </div>

                        {/* Lane track */}
                        <div className="relative h-8 bg-stone-900">
                          {lane.segments.map((seg, segIdx) => (
                            <div
                              key={segIdx}
                              className={`absolute top-[7px] h-[18px] rounded-sm ${lane.color} opacity-90`}
                              style={{ left: seg.left, width: seg.width }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Totals Strip */}
              <div className="mt-5 pt-4 border-t border-stone-700">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {card.totals.map((total, totalIdx) => (
                    <div key={totalIdx} className="flex items-center gap-2">
                      <span className="text-stone-500 text-xs">
                        {total.label}
                      </span>
                      <span className="font-mono text-sm font-semibold text-stone-200">
                        {total.value}
                      </span>
                      {totalIdx < card.totals.length - 1 && (
                        <span className="text-stone-700 text-xs ml-2 hidden sm:inline">
                          ·
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center font-mono text-xs text-stone-600">
          Logs generated against FMCSA 70-hr/8-day cycle rules — review with
          your fleet manager before dispatch
        </p>
      </div>
    </section>
  );
}
