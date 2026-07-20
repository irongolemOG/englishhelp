"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Trophy, Target, ArrowRight, BookOpen, Clock, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format, differenceInDays } from "date-fns";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [examDate, setExamDate] = useState<string | null>(null);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [stats, setStats] = useState({
    level: "Level 1: Absolute Beginner",
    progress: 0,
    streak: 0,
    xp: 0,
    accuracy: 0,
    lessons: 0
  });

  useEffect(() => {
    setMounted(true);
    const savedStats = localStorage.getItem("userStats");
    if (savedStats) setStats(JSON.parse(savedStats));
    const savedDate = localStorage.getItem("examDate");
    if (savedDate) setExamDate(savedDate);
  }, []);

  const handleSaveDate = (date: string) => {
    setExamDate(date);
    localStorage.setItem("examDate", date);
    setIsEditingDate(false);
  };

  if (!mounted) return null;

  let daysRemaining = 0;
  if (examDate) {
    daysRemaining = differenceInDays(new Date(examDate), new Date());
    if (daysRemaining < 0) daysRemaining = 0;
  }

  return (
    <PageWrapper className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      {/* 1. Header & Greeting */}
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          {stats.xp > 0 ? "Welcome back, Analyst." : "Welcome to your Master Guide."}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          You are currently on <span className="text-foreground font-medium">{stats.level}</span>. 
          You're {stats.progress}% of the way to unlocking the next tier.
        </p>
        
        <div className="pt-6 flex items-center gap-4">
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-12" asChild>
            <Link href="/learning-path" className="flex items-center">
              {stats.xp > 0 ? "Continue Learning" : "Start Learning"} <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </header>

      {/* 2. Stats & Countdown Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-12">
        
        <div className="md:col-span-8 space-y-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Your Progress</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Flame className="w-3 h-3"/> Streak</span>
              <p className="text-2xl font-semibold text-foreground">{stats.streak}d</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Trophy className="w-3 h-3"/> XP</span>
              <p className="text-2xl font-semibold text-foreground">{stats.xp.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Target className="w-3 h-3"/> Accuracy</span>
              <p className="text-2xl font-semibold text-foreground">{stats.accuracy}%</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><BookOpen className="w-3 h-3"/> Lessons</span>
              <p className="text-2xl font-semibold text-foreground">{stats.lessons}/50</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-secondary/50 rounded-lg p-6 relative group overflow-hidden border border-border">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center justify-between mb-4">
            Paper 1 
            <Clock className="w-4 h-4" />
          </h2>
          
          {!examDate || isEditingDate ? (
            <div className="space-y-3 animate-in fade-in duration-300">
              <p className="text-sm text-muted-foreground">Select your exam date to start the countdown.</p>
              <div className="flex gap-2">
                <input 
                  type="date" 
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-colors"
                  defaultValue={examDate || ""}
                  onChange={(e) => {
                    if (e.target.value) handleSaveDate(e.target.value);
                  }}
                />
                {isEditingDate && examDate && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingDate(false)}>Cancel</Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-5xl font-semibold tracking-tighter text-foreground tabular-nums">
                {daysRemaining}
              </p>
              <p className="text-sm text-muted-foreground">Days remaining</p>
              
              <div className="pt-4 flex justify-between items-center border-t border-border/50 mt-4">
                <span className="text-xs font-medium text-muted-foreground">
                  {format(new Date(examDate), 'MMMM d, yyyy')}
                </span>
                <button 
                  onClick={() => setIsEditingDate(true)}
                  className="text-xs font-medium text-foreground hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Daily Content */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-12">
        <Link href="/library/juxtaposition" className="group block space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center justify-between">
            Daily Device
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h2>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground group-hover:text-zinc-400 transition-colors">Juxtaposition</h3>
            <p className="text-muted-foreground prose">Placing two contrasting things side-by-side to highlight their differences.</p>
          </div>
        </Link>

        <Link href="/vocabulary" className="group block space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center justify-between">
            Word of the Day
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h2>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground group-hover:text-zinc-400 transition-colors">Subverts</h3>
            <p className="text-muted-foreground prose">To undermine the power and authority of an established system or expectation.</p>
          </div>
        </Link>
      </section>

      {/* 4. Recommended Next Steps */}
      <section className="space-y-6 border-t border-border pt-12">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Recommended</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/learning-path/structure" className="group p-6 rounded-lg border border-border bg-background hover:bg-secondary/50 transition-colors flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Mastering Enjambment</h3>
              <p className="text-sm text-muted-foreground">Analyze structural flow for Level 7.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
          <Link href="/analysis-builder" className="group p-6 rounded-lg border border-border bg-background hover:bg-secondary/50 transition-colors flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Analysis Builder</h3>
              <p className="text-sm text-muted-foreground">Practice breaking down unseen poetry.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        </div>
      </section>

    </PageWrapper>
  );
}
