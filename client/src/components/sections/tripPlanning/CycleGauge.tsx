type CycleGaugeProps = {
  usedHours: number;
  remainingHours: number | string;
  cyclePercent: number;
};

export default function CycleGauge({
  usedHours,
  remainingHours,
  cyclePercent,
}: CycleGaugeProps) {
  const sweep = 210;
  const startAngle = -sweep / 2;
  const endAngle = sweep / 2;
  const valueAngle =
    startAngle + (Math.min(Math.max(cyclePercent, 0), 100) / 100) * sweep;

  const cx = 100;
  const cy = 96;
  const r = 76;

  const polarToCartesian = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (a1: number, a2: number) => {
    const start = polarToCartesian(a2);
    const end = polarToCartesian(a1);
    const largeArcFlag = a2 - a1 <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const trackPath = describeArc(startAngle, endAngle);
  const valuePath = describeArc(startAngle, valueAngle);

  return (
    <div className="rounded-xl overflow-hidden border border-stone-700/60 bg-stone-900">
      {/* Book-spine header, same pattern as Fuel & Rest Stops */}
      <div className="flex items-stretch border-b border-stone-700/60">
        <div className="w-2 bg-amber-400/70 flex-shrink-0" />
        <div className="flex-1 px-5 py-3.5">
          <p className="font-serif text-sm font-semibold text-stone-200">
            Cycle Hours
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        <svg viewBox="0 0 200 150" className="w-full max-w-[260px]">
          <path
            d={trackPath}
            fill="none"
            stroke="currentColor"
            className="text-stone-800"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d={valuePath}
            fill="none"
            stroke="currentColor"
            className="text-amber-400"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            className="fill-stone-100 font-mono font-bold"
            style={{ fontSize: "34px" }}
          >
            {usedHours}
            <tspan className="fill-stone-500" style={{ fontSize: "16px" }}>
              {" "}
              / 70
            </tspan>
          </text>
          <text
            x={cx}
            y={cy + 22}
            textAnchor="middle"
            className="fill-stone-500 font-mono"
            style={{ fontSize: "11px" }}
          >
            hrs used this cycle
          </text>
          <text
            x={cx}
            y={cy + 40}
            textAnchor="middle"
            className="fill-stone-500 font-mono"
            style={{ fontSize: "11px" }}
          >
            {remainingHours} hrs remaining
          </text>
        </svg>

        <div className="flex items-center gap-5 mt-2 pt-4 border-t border-stone-800/60 w-full justify-center flex-wrap">
          {[
            { label: "0–42", color: "bg-emerald-400" },
            { label: "42–60", color: "bg-amber-400" },
            { label: "60–70", color: "bg-red-400" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="font-mono text-xs text-stone-500">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}