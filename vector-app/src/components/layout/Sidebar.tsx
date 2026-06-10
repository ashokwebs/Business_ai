'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, FolderOpen, Bot, LineChart, CreditCard, Network, History, Settings, Target, X, Cpu } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for toggle event from TopNav
  useEffect(() => {
    const handler = () => setMobileOpen(prev => !prev);
    window.addEventListener("toggle-mobile-sidebar", handler);
    return () => window.removeEventListener("toggle-mobile-sidebar", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Board Room", icon: Bot, href: "/boardroom", highlight: true },
    { name: "Projects", icon: FolderOpen, href: "/projects" },
    { name: "Agents", icon: Cpu, href: "/agents" },
    { name: "Strategy", icon: LineChart, href: "/strategy" },
    { name: "Finance", icon: CreditCard, href: "/finance" },
    { name: "Architecture", icon: Network, href: "/architecture" },
    { name: "Activity", icon: History, href: "/activity" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="flex items-center justify-between mb-8 px-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none text-on-surface tracking-tight">Vector</h1>
            <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-widest mt-1">Command Center</p>
          </div>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-1.5 flex-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/");
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium transition-all duration-200 w-full text-left relative group ${
                isActive 
                  ? "bg-surface-container-high text-on-surface shadow-sm" 
                  : (item as any).highlight 
                    ? "text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 font-bold border-transparent"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-on-surface rounded-r-full" />
              )}
              <Icon className={`w-[18px] h-[18px] transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile / Settings */}
      <div className="mt-auto pt-4 border-t border-outline-variant/50">
        <div className="flex items-center gap-3 px-3 py-3 bg-surface-container-low rounded-xl border border-outline-variant hover:bg-surface-container transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
            <span className="group-hover:hidden text-xs">VA</span>
            <Settings className="w-4 h-4 hidden group-hover:block" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-bold text-on-surface truncate">Vector Admin</h4>
            <p className="text-[10px] text-on-surface-variant truncate">admin@vector-ai.com</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface/90 backdrop-blur-xl border-r border-outline-variant flex-col p-4 z-40 transition-colors duration-300">
        {sidebarContent}
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <nav
        className={`md:hidden fixed left-0 top-0 h-screen w-72 bg-surface border-r border-outline-variant flex flex-col p-4 z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </nav>
    </>
  );
}
