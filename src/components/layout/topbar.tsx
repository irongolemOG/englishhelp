"use client";

import { Search, Bell, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";

export function Topbar() {
  return (
    <div className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      
      {/* Mobile left side */}
      <div className="flex md:hidden items-center">
        <MobileNav />
      </div>

      <div className="flex-1 flex items-center justify-end md:justify-start">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search lessons, devices, themes..."
            className="w-full h-9 bg-secondary border border-border rounded-md pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all placeholder:text-muted-foreground"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="hidden md:inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <Command className="w-3 h-3"/> K
            </kbd>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="md:hidden text-zinc-500 hover:text-foreground">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-foreground hidden md:flex">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="h-7 w-7 rounded-full bg-zinc-800 border border-border shadow-sm flex items-center justify-center text-xs font-medium text-white">
          A
        </div>
      </div>
    </div>
  );
}
