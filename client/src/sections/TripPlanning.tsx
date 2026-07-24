import { useState } from "react";
import { Badge } from "../components/ui/badge";
import Form from "../components/sections/tripPlanning/Form";
import Eyebrow from "../components/sections/tripPlanning/eyebrow";
import {
  MapPin,
  Clock,
  GasPump,
  Coffee,
  Package,
  CheckCircle,
  Warning,
  MapTrifold,
} from "@phosphor-icons/react";
import CycleGauge from "../components/sections/tripPlanning/CycleGauge";

import RouteMap from "../components/sections/tripPlanning/route";

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

export default function TripPlanning({
  createTrip,
  data,
  error,
  isLoading,
}: any) {
  const [newTrip, setNewTrip] = useState({
    currentLocation: "Karachi, Pakistan",
    pickupLocation: ["Lahore, Pakistan"],
    dropoffLocation: ["Peshawar, Pakistan"],
    cycleHours: "34.5",
  });

  const stopSchedule =
    data?.timeline
      ?.filter((item: any) =>
        [
          "Pickup",
          "Dropoff",
          "30 Minute Break",
          "Fuel Stop",
          "10 Minute Fuel Break",
        ].includes(item.event),
      )
      .map((item: any, index: any) => {
        let colorClass = "text-stone-400";
        let bgClass = "bg-stone-400/10";
        let icon = Coffee;

        switch (item.event) {
          case "Pickup":
            colorClass = "text-amber-400";
            bgClass = "bg-amber-400/10";
            icon = Package;
            break;

          case "Dropoff":
            colorClass = "text-emerald-400";
            bgClass = "bg-emerald-400/10";
            icon = CheckCircle;
            break;

          case "Fuel Stop":
          case "10 Minute Fuel Break":
            colorClass = "text-red-400";
            bgClass = "bg-red-400/10";
            icon = GasPump;
            break;

          case "30 Minute Break":
            colorClass = "text-stone-400";
            bgClass = "bg-stone-400/10";
            icon = Coffee;
            break;
        }

        return {
          id: `${item.event}-${index}`,
          type: item.event,
          location: item.location || "Along Route",
          duration: `${item.duration_hours} hrs`,
          window: item.window,
          detail:
            item.event === "30 Minute Break"
              ? "Required FMCSA Rest Break"
              : item.event === "Fuel Stop"
                ? "Fuel Refill Stop"
                : "",
          colorClass,
          bgClass,
          icon,
        };
      }) || [];

  const convertToMinutes = (time: string, isEndOfDay = false) => {
    const [timePart, meridiem] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    let total = hours * 60 + minutes;
    if (isEndOfDay && total === 0) total = 1440; // midnight-as-end, not midnight-as-start
    return total;
  };

  const tripSummary = [
    {
      label: "Total Distance",
      value: data?.route?.distance_miles?.toFixed(1) || 0,
      unit: "mi",
      icon: MapPin,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Trip Duration",
      value: data?.route?.duration_hours?.toFixed(1) || 0,
      unit: "hrs",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Fuel Stops",
      value: data?.fuel?.fuel_stops || 0,
      unit: "",
      icon: GasPump,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    {
      label: "Rest Breaks",
      value:
        data?.timeline?.filter((item: any) => item.event === "30 Minute Break")
          .length || 0,
      unit: "x30m",
      icon: Coffee,
      color: "text-stone-400",
      bg: "bg-stone-400/10",
    },
  ];

  const getTotals = (day: any) => {
    return [
      {
        label: "Off Duty",
        value: `${day.off_duty_hours}h`,
      },
      {
        label: "Driving",
        value: `${Number(day.driving_hours).toFixed(1)}h`,
      },
      {
        label: "On Duty",
        value: `${day.on_duty_hours}h`,
      },
      {
        label: "Sleeper",
        value: `${day.sleeper_hours}h`,
      },
    ];
  };
  const getEventSegments = (event: any) => {
    const start = convertToMinutes(event.arrival_time);
    const end = convertToMinutes(event.departure_time, true);

    if (end > start) {
      return [
        {
          left: `${(start / 1440) * 100}%`,
          width: `${((end - start) / 1440) * 100}%`,
        },
      ];
    }

    // true midnight-crossing fallback — should basically never trigger now
    // that the backend splits events at midnight, but kept as a safety net
    return [
      {
        left: `${(start / 1440) * 100}%`,
        width: `${((1440 - start) / 1440) * 100}%`,
      },
      { left: "0%", width: `${(end / 1440) * 100}%` },
    ];
  };

  const getSegments = (events: any[], ...types: string[]) => {
    return events

      .filter((event) => types.includes(event.event))

      .flatMap((event) => getEventSegments(event));
  };

  const getLanes = (events: any[]) => {
    return [
      {
        label: "Off",
        color: "bg-stone-600",
        segments: getSegments(events, "10 Hour Off Duty"),
      },
      {
        label: "Sleeper",
        color: "bg-blue-500",
        segments: getSegments(events, "30 Minute Break"),
      },
      {
        label: "Driving",
        color: "bg-amber-400",
        segments: getSegments(events, "Driving"),
      },
      {
        label: "On Duty",
        color: "bg-emerald-400",
        segments: getSegments(events, "Pickup", "Dropoff"),
      },
    ];
  };

  const pickups = data?.timeline?.filter(
    (item: any) => item.event === "Pickup",
  );
  const pickup = data?.timeline?.find((item: any) => item.event === "Pickup");

  const totalPickupHours = pickups?.reduce(
    (total: any, pickup: any) => total + pickup.duration_hours,
    0,
  );

  const dropoff = data?.timeline?.find((item: any) => item.event === "Dropoff");

  const tripStops = [
    {
      label: "Pickup Duration",
      location: pickup?.location || "N/A",
      duration: `${totalPickupHours || 0} hrs`,
      window: pickup?.window || "N/A",
      icon: Package,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      spine: "bg-amber-400/70",
    },
    {
      label: "Dropoff Duration",
      location: dropoff?.location || "N/A",
      duration: `${dropoff?.duration_hours || 0} hrs`,
      window: dropoff?.window || "N/A",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      spine: "bg-emerald-400/70",
    },
  ];

  // const [routePlanned, setRoutePlanned] = useState(false);
  // const [isPlanning, setIsPlanning] = useState(false);

  const handlePlanRoute = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      current_location: newTrip.currentLocation,

      pickup_locations: newTrip.pickupLocation,

      dropoff_locations: newTrip.dropoffLocation,

      current_cycle_used: Number(newTrip.cycleHours),
    };

    await createTrip(payload).unwrap();
  };

  const usedHours = parseFloat(newTrip.cycleHours) || 0;
  const remainingHours = Math.max(0, 70 - usedHours).toFixed(1);
  const cyclePercent = Math.min((usedHours / 70) * 100, 100);
  // if (isLoading) return <p> Loading...</p>;

  if (error) return <p>There was an error</p>;

  console.log(data);

  return (
    <section
      id="trip-planning"
      className="bg-stone-950 min-h-screen py-12 px-4 md:px-8 lg:px-16"
    >
      {/* Section eyebrow */}
      <Eyebrow />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
        {/* ── LEFT: Intake Form ── */}
        <Form
          newTrip={newTrip}
          remainingHours={remainingHours}
          cyclePercent={cyclePercent}
          handlePlanRoute={handlePlanRoute}
          setNewTrip={setNewTrip}
          isLoading={isLoading}
        />

        {/* ── RIGHT: Results Panel ── */}
        <div>
          {!data ? (
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
                        {data?.summary?.total_distance} mi
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
                <div className="h-96 w-full">
                  <RouteMap
                    route={data?.route?.polyline}
                    stops={data?.timeline}
                  />
                </div>
              </div>

              {/* ── Trip Summary Strip ── */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tripSummary.map((stat) => (
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

              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
                <CycleGauge
                  usedHours={usedHours}
                  remainingHours={remainingHours}
                  cyclePercent={cyclePercent}
                />
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
                    {stopSchedule.map((stop: any) => (
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
              </div>

              {/* ── Pickup & Dropoff Timing ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tripStops.map((item) => (
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

              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-stone-200">
                      Daily ELD Logs
                    </h3>
                    <p className="font-mono text-xs text-stone-600 mt-0.5">
                      Auto-generated duty status timeline — §395.8
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
                  {data?.eld?.daily_logs?.map((day: any) => {
                    const totals = getTotals(day);
                    const lanes = getLanes(day.events);

                    return (
                      <div
                        key={day.day}
                        className="rounded-xl overflow-hidden border border-stone-700/60 bg-stone-900"
                      >
                        {/* Header */}
                        <div className="flex items-stretch border-b border-stone-800/60">
                          <div className="w-2 bg-stone-600/60 flex-shrink-0" />

                          <div className="flex-1 px-5 py-3.5 flex items-center justify-between flex-wrap gap-2">
                            <div>
                              <p className="font-serif text-sm font-semibold text-stone-200">
                                Day {day.day}
                              </p>

                              <p className="font-mono text-xs text-stone-600 mt-0.5">
                                FMCSA Daily Duty Log
                              </p>
                            </div>

                            <Badge className="font-mono text-xs bg-stone-800 text-stone-400 border-stone-700">
                              {Number(day.driving_hours).toFixed(1)} hrs driven
                            </Badge>
                          </div>
                        </div>

                        <div className="p-5">
                          {/* Hour Axis */}
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

                          {/* ELD Lanes */}
                          <div className="border border-stone-800 rounded-lg overflow-hidden">
                            {lanes.map((lane: any, li: number) => (
                              <div
                                key={lane.label}
                                className={`grid grid-cols-[72px_1fr] ${
                                  li < lanes.length - 1
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
                                  {lane.segments.map(
                                    (segment: any, index: number) => (
                                      <div
                                        key={index}
                                        className={`absolute top-1.5 h-5 rounded-sm ${lane.color} opacity-80`}
                                        style={{
                                          left: segment.left,
                                          width: segment.width,
                                        }}
                                      />
                                    ),
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Totals */}
                          <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-4 pt-4 border-t border-stone-800/60">
                            {totals.map((total: any) => (
                              <div
                                key={total.label}
                                className="font-mono text-xs text-stone-500"
                              >
                                {total.label}{" "}
                                <span className="text-stone-300 font-semibold">
                                  {total.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
