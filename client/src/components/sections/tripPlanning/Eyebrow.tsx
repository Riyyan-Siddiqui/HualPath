const Eyebrow = () => {
  return (
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
  );
};

export default Eyebrow;
