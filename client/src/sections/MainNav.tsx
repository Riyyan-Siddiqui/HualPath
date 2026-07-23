import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  MapTrifold,
  Path,
  CalendarCheck,
  ClipboardText,
  BookmarkSimple,
  Files,
  CaretLeft,
  CaretRight,
  User,
} from "@phosphor-icons/react";

const primaryNavItems = [
  {
    label: "Trip Planning",
    href: "#trip-planning",
    icon: MapTrifold,
    id: "trip-planning",
  },
  {
    label: "Route Summary",
    href: "#route-summary",
    icon: Path,
    id: "route-summary",
  },
  {
    label: "Stop Schedule",
    href: "#stop-schedule",
    icon: CalendarCheck,
    id: "stop-schedule",
  },
  {
    label: "ELD Logs",
    href: "#eld-logs",
    icon: ClipboardText,
    id: "eld-logs",
  },
];

const utilityNavItems = [
  {
    label: "Saved Trips",
    href: "#top",
    icon: BookmarkSimple,
    id: "saved-trips",
  },
  {
    label: "Fleet Records",
    href: "#top",
    icon: Files,
    id: "fleet-records",
  },
];

export default function MainNav({
  activePanel,
  onNavigate,
}: {
  activePanel: string;
  onNavigate: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const ExpandedHeader = () => (
    <div className="flex items-center justify-between px-3 h-14 shrink-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-md">
          <Truck
            weight="duotone"
            size={17}
            className="text-primary-foreground"
          />
        </div>
        <div className="min-w-0">
          <div className="font-heading text-sm font-semibold text-foreground tracking-tight truncate leading-tight">
            Haulpath
          </div>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground truncate leading-tight">
            Trip &amp; HOS Planner
          </div>
        </div>
      </div>
      <button
        onClick={() => setCollapsed(true)}
        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        title="Collapse sidebar"
      >
        <CaretLeft weight="duotone" size={15} />
      </button>
    </div>
  );

  const CollapsedHeader = () => (
    <div className="flex items-center justify-center h-14 shrink-0">
      <button
        onClick={() => setCollapsed(false)}
        title="Expand sidebar"
        className="relative w-8 h-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
            <Truck
              weight="duotone"
              size={17}
              className="text-primary-foreground"
            />
          </div>
        </span>
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <CaretRight
              weight="duotone"
              size={15}
              className="text-foreground"
            />
          </div>
        </span>
      </button>
    </div>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
      {/* Header */}
      {collapsed ? <CollapsedHeader /> : <ExpandedHeader />}

      {/* Book-spine divider */}
      <div className={`px-3 mb-1 ${collapsed ? "px-2" : ""}`}>
        <div className="flex items-center gap-2">
          {!collapsed && (
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono whitespace-nowrap">
              Navigation
            </span>
          )}
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>

      {/* Primary Nav */}
      <nav className="flex flex-col gap-0.5 px-2 mb-2">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`
                flex items-center gap-3 rounded-md px-2 py-2 text-left w-full
                transition-all duration-300 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }
              `}
            >
              <Icon
                weight="duotone"
                size={17}
                className={`shrink-0 ${isActive ? "text-primary" : ""}`}
              />
              {!collapsed && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
              {!collapsed && isActive && (
                <span className="ml-auto">
                  <Badge className="text-[9px] px-1.5 py-0 font-mono uppercase tracking-wide bg-primary text-primary-foreground">
                    Active
                  </Badge>
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Book-spine divider — Utilities */}
      <div className={`px-3 mb-1 ${collapsed ? "px-2" : ""}`}>
        <div className="flex items-center gap-2">
          {!collapsed && (
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono whitespace-nowrap">
              Records
            </span>
          )}
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>

      {/* Utility Nav */}
      <nav className="flex flex-col gap-0.5 px-2 mb-4">
        {utilityNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`
                flex items-center gap-3 rounded-md px-2 py-2 text-left w-full
                transition-all duration-300 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2
                text-muted-foreground hover:text-foreground hover:bg-muted
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon
                weight="duotone"
                size={16}
                className="shrink-0 opacity-70"
              />
              {!collapsed && (
                <span className="text-sm truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Book-spine divider — Account */}
      <div className={`px-3 mb-1 ${collapsed ? "px-2" : ""}`}>
        <div className="flex items-center gap-2">
          {!collapsed && (
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono whitespace-nowrap">
              Account
            </span>
          )}
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>

      {/* User Block */}
      <div className={`px-2 pb-4`}>
        <div
          className={`
            flex items-center gap-3 rounded-md px-2 py-2
            hover:bg-muted transition-all duration-300 cursor-pointer
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
            <User
              weight="duotone"
              size={16}
              className="text-muted-foreground"
            />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-foreground truncate leading-tight font-heading">
                Ray Callahan
              </div>
              <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide truncate leading-tight">
                Night Dispatcher
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-md"
        onClick={() => setMobileOpen(true)}
        title="Open navigation"
      >
        <Truck weight="duotone" size={17} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`
          lg:hidden fixed top-0 left-0 z-50 h-full w-60 bg-stone-950 border-r border-border
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          className="absolute top-3 right-3 w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setMobileOpen(false)}
          title="Close navigation"
        >
          <CaretLeft weight="duotone" size={14} />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <aside
        id="main-nav"
        className={`
          hidden lg:flex flex-col h-screen sticky top-0
          bg-stone-950 border-r border-border
          transition-all duration-300 ease-out
          ${collapsed ? "w-16" : "w-60"}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
