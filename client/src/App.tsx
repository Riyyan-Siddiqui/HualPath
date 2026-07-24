import { useState } from "react";
// import MainNav from "./sections/MainNav";
import WorkspaceBar from "./sections/WorkspaceBar";
import TripPlanning from "./sections/TripPlanning";
import RouteSummary from "./sections/RouteSummary";
import StopSchedule from "./sections/StopSchedule";
import EldLogs from "./sections/EldLogs";
import { useCreateTripsMutation } from "./services/backendApi";

export default function App() {
  const [activePanel] = useState("trip-planning");

  const [createTrip, { data, error, isLoading }] = useCreateTripsMutation();

  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      {/* <MainNav activePanel={activePanel} onNavigate={setActivePanel} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkspaceBar />
        <main className="flex-1 overflow-y-auto p-6">
          {activePanel === "trip-planning" &&
            <TripPlanning createTrip={createTrip} data={data} error={error} isLoading={isLoading} />}
          {activePanel === "route-summary" && <RouteSummary />}
          {activePanel === "stop-schedule" && <StopSchedule />}
          {activePanel === "eld-logs" && <EldLogs />}
        </main>
      </div>
    </div>
  );
}
