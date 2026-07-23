import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CaretDown,
  MagnifyingGlass,
  Truck,
  MapPin,
  Star,
  User,
  ClockCountdown,
} from "@phosphor-icons/react";

const workspaces = [
  { id: "dallas-memphis", label: "Dallas → Memphis", active: true },
  { id: "chicago-denver", label: "Chicago → Denver", active: false },
  { id: "atlanta-houston", label: "Atlanta → Houston", active: false },
];

const notifications = [
  { id: 1, text: "30-min break required at MI 402", type: "warning" },
  { id: 2, text: "Fuel stop confirmed — Texarkana", type: "info" },
];

export default function WorkspaceBar() {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header
      id="workspace-bar"
      className="h-14 bg-stone-900 border-b border-border flex items-center gap-0 px-4 relative z-10"
    >
      {/* ── Workspace Switcher ── */}
      <div className="relative flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Truck weight="duotone" size={15} className="text-primary" />
        </div>
        <button
          onClick={() => {
            setWorkspaceOpen((p) => !p);
            setNotifOpen(false);
            setUserOpen(false);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-heading font-semibold text-foreground hover:bg-muted transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:-translate-y-0.5"
        >
          <span className="font-mono text-xs text-muted-foreground mr-0.5 hidden sm:inline">
            WS
          </span>
          <span className="max-w-[140px] truncate">
            {activeWorkspace.label}
          </span>
          <CaretDown
            weight="duotone"
            size={13}
            className={`text-muted-foreground transition-transform duration-200 ${workspaceOpen ? "rotate-180" : ""}`}
          />
        </button>

        {workspaceOpen && (
          <div className="absolute top-full left-0 mt-1.5 w-56 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                Trip Workspaces
              </p>
            </div>
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  setActiveWorkspace(ws);
                  setWorkspaceOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm text-left transition-all duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  ws.id === activeWorkspace.id
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground"
                }`}
              >
                <span className="font-mono text-xs">{ws.label}</span>
                {ws.id === activeWorkspace.id && (
                  <Badge className="text-[10px] px-1.5 py-0 font-mono bg-primary text-primary-foreground">
                    active
                  </Badge>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Breadcrumb ── */}
      <div className="hidden md:flex items-center gap-1 ml-2 text-muted-foreground flex-shrink-0">
        <Star size={13} weight="duotone" />
        <a
          href="#trip-planning"
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-200 px-1"
        >
          Plan Trip
        </a>
        <Star size={13} weight="duotone" />
        <span className="flex items-center gap-1 text-xs font-mono text-foreground">
          <MapPin weight="duotone" size={11} className="text-primary" />
          Route Summary
        </span>
      </div>

      {/* ── Book-spine divider ── */}
      <div className="hidden md:block mx-4 h-7 w-px bg-border flex-shrink-0 relative">
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      {/* ── Global Search (centered) ── */}
      <div className="flex-1 flex justify-center px-2 min-w-0">
        <div className="relative w-full max-w-xs">
          <MagnifyingGlass
            weight="duotone"
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search stops, routes, logs…"
            className="pl-8 h-8 text-xs font-mono bg-muted border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-1 rounded-md"
          />
        </div>
      </div>

      {/* ── Book-spine divider ── */}
      <div className="hidden md:block mx-4 h-7 w-px bg-border flex-shrink-0" />

      {/* ── Right cluster ── */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Cycle Hours Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted border border-border mr-1">
          <ClockCountdown
            weight="duotone"
            size={14}
            className="text-primary flex-shrink-0"
          />
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              Cycle
            </span>
            <span className="font-mono text-xs font-semibold text-foreground">
              34.5
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              / 70 hrs
            </span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-sm flex-shrink-0" />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((p) => !p);
              setWorkspaceOpen(false);
              setUserOpen(false);
            }}
            className="relative flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Bell weight="duotone" size={16} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-72 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-3 py-2 border-b border-border flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                  Alerts
                </p>
                <Badge className="text-[10px] font-mono bg-primary text-primary-foreground px-1.5 py-0">
                  {notifications.length}
                </Badge>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="px-3 py-2.5 border-b border-border last:border-b-0 hover:bg-muted transition-colors duration-150"
                >
                  <p className="text-xs font-mono text-foreground leading-relaxed">
                    {n.text}
                  </p>
                  <span
                    className={`inline-block mt-1 text-[10px] font-mono uppercase tracking-wide ${
                      n.type === "warning"
                        ? "text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {n.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setUserOpen((p) => !p);
              setWorkspaceOpen(false);
              setNotifOpen(false);
            }}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
              <User weight="duotone" size={13} />
            </div>
            <span className="hidden sm:block text-xs font-mono text-foreground">
              J. Mercer
            </span>
            <CaretDown
              weight="duotone"
              size={11}
              className={`text-muted-foreground transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`}
            />
          </button>

          {userOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-3 py-2.5 border-b border-border">
                <p className="text-xs font-mono text-foreground font-semibold">
                  J. Mercer
                </p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  CDL-A · Fleet #4412
                </p>
              </div>
              {[
                { label: "Driver Profile", href: "#trip-planning" },
                { label: "Trip History", href: "#eld-logs" },
                { label: "HOS Settings", href: "#trip-planning" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setUserOpen(false)}
                  className="block px-3 py-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-border">
                <button className="w-full text-left px-3 py-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150">
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
