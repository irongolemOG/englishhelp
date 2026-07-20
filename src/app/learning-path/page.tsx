"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, CheckCircle2, Play, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import lessonsData from "@/data/lessons.json";
import { Lesson } from "@/types";

const levels = [
  { id: 1, name: "Absolute Beginner", status: "completed" },
  { id: 2, name: "Understanding Analysis", status: "completed" },
  { id: 3, name: "Literary Devices", status: "completed" },
  { id: 4, name: "Language & Diction", status: "current" },
  { id: 5, name: "Structure & Form", status: "locked" },
  { id: 6, name: "Themes & Context", status: "locked" },
  { id: 7, name: "Poetry Mastery", status: "locked" },
  { id: 8, name: "Prose Mastery", status: "locked" },
  { id: 9, name: "Comparative Analysis", status: "locked" },
  { id: 10, name: "Exam Mastery (Paper 1 & 2)", status: "locked" },
];

const typedLessons = lessonsData as Lesson[];

export default function LearningPathPage() {
  return (
    <PageWrapper className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-16">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          The Learning Path
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          Follow this structured journey from absolute beginner to Level 7 IB Examiner thinking. Each module builds upon the previous one.
        </p>
      </header>

      <div className="relative border-l border-border ml-3 md:ml-4 space-y-16 pb-16">
        {levels.map((level, index) => {
          const isLocked = level.status === "locked";
          const isCurrent = level.status === "current";
          const isCompleted = level.status === "completed";
          
          const relevantLessons = typedLessons.filter(l => l.level === level.id);

          return (
            <div key={level.id} className={cn(
              "relative pl-8 md:pl-12 transition-opacity",
              isLocked && "opacity-50"
            )}>
              {/* Node on timeline */}
              <div className={cn(
                "absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-background flex items-center justify-center transition-all",
                isCompleted ? "bg-foreground" : isCurrent ? "bg-foreground scale-125" : "bg-muted"
              )} />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-1">
                      Phase {level.id}
                    </span>
                    <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                      {level.name}
                      {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                      {isLocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {relevantLessons.length > 0 ? (
                    relevantLessons.map(lesson => (
                      <div key={lesson.id} className={cn(
                        "group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-lg border transition-colors gap-4",
                        isLocked ? "bg-transparent border-border" : isCurrent ? "bg-background border-foreground shadow-sm" : "bg-secondary/30 border-border hover:border-foreground/50 hover:bg-secondary/50"
                      )}>
                        <div className="space-y-1 md:pr-4">
                          <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{lesson.overview}</p>
                        </div>
                        
                        {!isLocked && (
                          <Button size="sm" variant={isCurrent ? "default" : "outline"} className="shrink-0" asChild>
                            <Link href={`/learning-path/${lesson.id}`}>
                              {isCompleted ? "Review" : "Start"} 
                              {isCompleted ? <BookOpen className="w-4 h-4 ml-2" /> : <Play className="w-3 h-3 ml-2" />}
                            </Link>
                          </Button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-5 rounded-lg border border-border border-dashed">
                      <p className="text-sm text-muted-foreground italic">Modules for this phase are being formulated.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
