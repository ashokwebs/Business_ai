"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Bell, Sun, Moon, Target, Menu } from "lucide-react";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileSidebar = () => {
    window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"));
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant flex justify-between items-center h-16 px-4 md:px-6 transition-colors duration-300">
      {/* Mobile Brand (Hidden on Desktop) */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={toggleMobileSidebar}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <Target className="w-3.5 h-3.5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-on-surface">Vector</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative focus-within:ring-1 focus-within:ring-outline rounded-md transition-shadow duration-200">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input 
            type="text" 
            className="bg-surface-container border border-outline-variant rounded-md py-1.5 pl-9 pr-4 text-sm text-on-surface focus:outline-none w-64 transition-colors placeholder:text-on-surface-variant/50" 
            placeholder="Search insights..." 
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto md:ml-0">
        
        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none flex items-center justify-center w-8 h-8 rounded-md hover:bg-surface-container"
        >
          {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button className="hidden sm:flex text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none items-center justify-center w-8 h-8 rounded-md hover:bg-surface-container">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        
        <button className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none relative flex items-center justify-center w-8 h-8 rounded-md hover:bg-surface-container">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        </button>
        
        {/* Profile avatar — using initials instead of broken external URL */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 border border-outline-variant overflow-hidden ml-1 hover:border-outline transition-colors duration-200 cursor-pointer flex items-center justify-center">
          <span className="text-white text-xs font-bold">VA</span>
        </div>
      </div>
    </header>
  );
}
