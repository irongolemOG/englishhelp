"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import devicesData from "@/data/devices.json";
import { LiteraryDevice } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, LibraryBig } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function LibraryPage() {
  const [search, setSearch] = useState("");

  const typedDevices = devicesData as LiteraryDevice[];
  const filteredDevices = typedDevices.filter((device) => 
    device.name.toLowerCase().includes(search.toLowerCase()) ||
    device.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      {/* Header */}
      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Literary Devices
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Explore our comprehensive database of analytical tools. Learn how to identify, analyze, and evaluate literary choices like an examiner.
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search devices..."
              className="pl-10 bg-background border-border focus-visible:ring-1 h-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Index List */}
      <section className="border-t border-border pt-4">
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-widest border-b border-border/50">
          <div className="col-span-3">Term</div>
          <div className="col-span-6">Definition</div>
          <div className="col-span-3 text-right">Attributes</div>
        </div>
        
        <div className="divide-y divide-border">
          {filteredDevices.map((device: LiteraryDevice) => (
            <Link 
              href={`/library/${device.id}`} 
              key={device.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-6 hover:bg-secondary/30 transition-colors items-center"
            >
              <div className="md:col-span-3">
                <h2 className="text-xl font-semibold text-foreground group-hover:text-zinc-400 transition-colors flex items-center">
                  {device.name}
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h2>
              </div>
              
              <div className="md:col-span-6">
                <p className="text-muted-foreground pr-4 line-clamp-2 md:line-clamp-none">
                  {device.definition}
                </p>
              </div>

              <div className="md:col-span-3 flex flex-wrap md:justify-end gap-2 mt-2 md:mt-0">
                <Badge variant="outline" className={cn(
                  "bg-background",
                  device.difficultyLevel === "Beginner" && "text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
                  device.difficultyLevel === "Intermediate" && "text-blue-600 dark:text-blue-400 border-blue-500/30",
                  device.difficultyLevel === "Advanced" && "text-purple-600 dark:text-purple-400 border-purple-500/30",
                  device.difficultyLevel === "Examiner" && "text-rose-600 dark:text-rose-400 border-rose-500/30",
                )}>
                  {device.difficultyLevel}
                </Badge>
                {device.frequencyInExams === "High" && (
                  <Badge variant="secondary" className="bg-secondary text-foreground border-border">High Freq</Badge>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">No literary devices found matching "{search}".</p>
          </div>
        )}
      </section>

    </PageWrapper>
  );
}
