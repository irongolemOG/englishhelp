"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Settings, Moon, Sun, Database } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <PageWrapper className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-[calc(100vh-4rem)]">
      <header className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          Manage your master guide preferences and data.
        </p>
      </header>
      
      <div className="grid gap-8">
        <section className="space-y-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center border-b border-border/50 pb-2">
            <Sun className="w-4 h-4 mr-2" /> Appearance
          </h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-background rounded-xl border border-border">
            <div className="space-y-1 max-w-sm">
              <p className="font-medium text-foreground">Theme Preference</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Switch between Light and Dark mode. Dark mode is highly recommended for late-night study sessions.</p>
            </div>
            <div className="flex items-center space-x-3 bg-secondary/50 p-1.5 rounded-lg border border-border shrink-0">
              <Button 
                variant="ghost"
                onClick={() => setTheme("light")}
                className={cn(
                  "px-4 h-9 font-medium",
                  theme === "light" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Sun className="w-4 h-4 mr-2" /> Light
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setTheme("dark")}
                className={cn(
                  "px-4 h-9 font-medium",
                  theme === "dark" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Moon className="w-4 h-4 mr-2" /> Dark
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center border-b border-border/50 pb-2">
            <Database className="w-4 h-4 mr-2" /> Data Management
          </h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-background rounded-xl border border-border">
            <div className="space-y-1 max-w-sm">
              <p className="font-medium text-foreground">Reset Progress</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Clear all completed lessons, streaks, and flashcard data from this device. This cannot be undone.</p>
            </div>
            <Button variant="destructive" className="shrink-0 font-medium px-6">
              Reset All Data
            </Button>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
