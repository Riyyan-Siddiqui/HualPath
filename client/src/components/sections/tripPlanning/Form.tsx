import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { ArrowRight, Truck, Timer, Path, Plus, X } from "@phosphor-icons/react";

const Form = ({
  newTrip,
  remainingHours,
  cyclePercent,
  handlePlanRoute,
  setNewTrip,
  isLoading,
}: any) => {
  // --- helpers for array fields (pickupLocation / dropoffLocation) ---
  const updateLocationAt = (
    field: "pickupLocation" | "dropoffLocation",
    index: number,
    value: string,
  ) => {
    setNewTrip((prev: any) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addLocation = (field: "pickupLocation" | "dropoffLocation") => {
    setNewTrip((prev: any) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeLocation = (
    field: "pickupLocation" | "dropoffLocation",
    index: number,
  ) => {
    setNewTrip((prev: any) => {
      const updated = prev[field].filter((_: any, i: number) => i !== index);
      // never let it go empty — keep at least one input
      return { ...prev, [field]: updated.length ? updated : [""] };
    });
  };

  return (
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
        <div className="relative space-y-4">
          <div className="absolute left-[11px] top-8 bottom-8 w-px border-l border-dashed border-stone-600 z-0" />

          {/* Current Location — stays a single string */}
          <div className="relative z-10">
            <Label className="flex items-center gap-2 text-xs text-stone-400 font-mono uppercase tracking-wide mb-2">
              <span className="w-3 h-3 rounded-full border-2 border-blue-400 bg-stone-900 flex-shrink-0" />
              Current Location
              <span className="text-amber-400 text-xs">*</span>
            </Label>
            <Input
              value={newTrip.currentLocation}
              onChange={(e: any) =>
                setNewTrip((prev: any) => ({
                  ...prev,
                  currentLocation: e.target.value,
                }))
              }
              placeholder="e.g. Dallas, TX"
              required
              className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 font-mono text-sm rounded-lg focus-visible:ring-amber-400/50 focus-visible:border-amber-400/60 transition-all duration-200"
            />
          </div>

          {/* Pickup Location(s) — array */}
          <div className="relative z-10">
            <Label className="flex items-center gap-2 text-xs text-stone-400 font-mono uppercase tracking-wide mb-2">
              <span className="w-3 h-3 rounded-full border-2 border-amber-400 bg-stone-900 flex-shrink-0" />
              Pickup Location(s)
              <span className="text-amber-400 text-xs">*</span>
            </Label>
            <div className="space-y-2">
              {newTrip.pickupLocation.map((loc: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={loc}
                    onChange={(e: any) =>
                      updateLocationAt("pickupLocation", index, e.target.value)
                    }
                    placeholder="e.g. Fort Worth, TX"
                    required
                    className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 font-mono text-sm rounded-lg focus-visible:ring-amber-400/50 focus-visible:border-amber-400/60 transition-all duration-200"
                  />
                  {newTrip.pickupLocation.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLocation("pickupLocation", index)}
                      className="shrink-0 text-stone-500 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addLocation("pickupLocation")}
                className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add pickup stop
              </button>
            </div>
          </div>

          {/* Dropoff Location(s) — array */}
          <div className="relative z-10">
            <Label className="flex items-center gap-2 text-xs text-stone-400 font-mono uppercase tracking-wide mb-2">
              <span className="w-3 h-3 rounded-full border-2 border-emerald-400 bg-stone-900 flex-shrink-0" />
              Dropoff Location(s)
              <span className="text-amber-400 text-xs">*</span>
            </Label>
            <div className="space-y-2">
              {newTrip.dropoffLocation.map((loc: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={loc}
                    onChange={(e: any) =>
                      updateLocationAt("dropoffLocation", index, e.target.value)
                    }
                    placeholder="e.g. Memphis, TN"
                    required
                    className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 font-mono text-sm rounded-lg focus-visible:ring-amber-400/50 focus-visible:border-amber-400/60 transition-all duration-200"
                  />
                  {newTrip.dropoffLocation.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLocation("dropoffLocation", index)}
                      className="shrink-0 text-stone-500 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addLocation("dropoffLocation")}
                className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add dropoff stop
              </button>
            </div>
          </div>
        </div>

        <Separator className="bg-stone-800" />

        {/* Cycle Hours — unchanged */}
        <div>
          <Label className="flex items-center gap-2 text-xs text-stone-400 font-mono uppercase tracking-wide mb-2">
            <Timer weight="duotone" className="w-3.5 h-3.5 text-stone-500" />
            Current Cycle Used
            <span className="text-amber-400 text-xs">*</span>
          </Label>
          <div className="relative">
            <Input
              type="number"
              min={0}
              max={70}
              step={0.5}
              value={newTrip.cycleHours}
              onChange={(e: any) =>
                setNewTrip((prev: any) => ({
                  ...prev,
                  cycleHours: e.target.value,
                }))
              }
              placeholder="0"
              required
              className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 font-mono text-sm rounded-lg pr-20 focus-visible:ring-amber-400/50 focus-visible:border-amber-400/60 transition-all duration-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-stone-500 pointer-events-none">
              hrs / 70
            </span>
          </div>
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
          disabled={isLoading}
          className="w-full bg-amber-400 text-stone-950 hover:bg-amber-300 font-semibold text-sm rounded-lg py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <span className="font-mono">Calculating route…</span>
          ) : (
            <>
              <Path weight="duotone" className="w-4 h-4 mr-2" />
              Plan Route
              <ArrowRight weight="bold" className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-800 pt-4 font-mono">
          Route, fuel and rest stops are calculated against FMCSA 70‑hr/8‑day
          cycle rules. Logs are generated per §395.8.
        </p>
      </form>
    </div>
  );
};

export default Form;
