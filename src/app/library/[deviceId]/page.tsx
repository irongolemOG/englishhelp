"use client";

import { useParams, useRouter } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import devicesData from "@/data/devices.json";
import { LiteraryDevice } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, BrainCircuit, Heart, Info, AlertTriangle, GraduationCap, CheckCircle2, Lightbulb, Bookmark } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DevicePage() {
  const params = useParams();
  const router = useRouter();
  const deviceId = params.deviceId as string;
  
  const device = (devicesData as LiteraryDevice[]).find(d => d.id === deviceId);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!device) {
    return (
      <PageWrapper className="p-8">
        <h1 className="text-2xl font-semibold">Device not found.</h1>
        <Button onClick={() => router.back()} className="mt-4" variant="outline">Go Back</Button>
      </PageWrapper>
    );
  }

  const handleQuizSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
  };

  return (
    <PageWrapper className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-16">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground -ml-4" onClick={() => router.push('/library')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Library
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <Bookmark className="w-4 h-4 mr-2" /> Save
        </Button>
      </div>

      {/* Hero Header */}
      <header className="space-y-6 mb-16">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">Literary Device</Badge>
          <Badge variant="outline" className="border-border text-muted-foreground">{device.difficultyLevel}</Badge>
          {device.frequencyInExams === "High" && <Badge variant="outline" className="border-foreground text-foreground">High Exam Frequency</Badge>}
        </div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground">
          {device.name}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-2xl">
          {device.definition}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Main Reading Column */}
        <article className="md:col-span-8 space-y-16">
          
          {/* Deep Dive */}
          {device.advancedExplanation && (
            <section className="space-y-6">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Deep Dive</h2>
              <p className="prose">{device.advancedExplanation}</p>
            </section>
          )}

          {/* Master Examples (Editorial layout) */}
          <section className="space-y-8">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Master Examples</h2>
            
            <div className="space-y-12">
              {device.realExamples.map((ex, i) => (
                <div key={i} className="pl-6 border-l-2 border-foreground space-y-4">
                  <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed text-foreground italic">
                    "{ex.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">— {ex.source}</span>
                    <Badge variant="secondary" className="text-xs bg-secondary">{ex.difficulty}</Badge>
                  </div>
                </div>
              ))}
            </div>
            
            {(device.everydayExample || device.literaryExample) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-border/50">
                {device.everydayExample && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Everyday Context</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">"{device.everydayExample}"</p>
                  </div>
                )}
                {device.literaryExample && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Classic Literature</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">"{device.literaryExample}"</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Level 7 Analysis Example */}
          <section className="space-y-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Level 7 Analysis</h2>
            <div className="bg-secondary/30 rounded-lg p-6 md:p-8 border border-border">
              <p className="prose text-foreground leading-loose">
                {device.ibLevel7Analysis}
              </p>
            </div>
          </section>

          {/* Interactive Exercise */}
          <section className="space-y-6 pt-8 border-t border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pb-2">Knowledge Check</h2>
            <div className="space-y-6">
              <p className="text-lg font-medium text-foreground">{device.interactiveExercise.question}</p>
              <div className="space-y-3">
                {device.interactiveExercise.options.map((option, i) => {
                  const isCorrect = i === device.interactiveExercise.correctIndex;
                  const isSelected = i === selectedOption;
                  
                  let btnClass = "w-full justify-start h-auto py-4 px-6 text-left whitespace-normal text-base border transition-colors ";
                  
                  if (showExplanation) {
                    if (isCorrect) {
                      btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
                    } else if (isSelected && !isCorrect) {
                      btnClass += "border-destructive/50 bg-destructive/10 text-destructive";
                    } else {
                      btnClass += "border-border opacity-50";
                    }
                  } else {
                    btnClass += "bg-background hover:bg-secondary border-border text-foreground";
                  }

                  return (
                    <Button
                      key={i}
                      variant="outline"
                      className={btnClass}
                      onClick={() => handleQuizSelect(i)}
                      disabled={showExplanation}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="p-6 rounded-lg bg-secondary/50 border border-border mt-6 animate-in slide-in-from-top-2">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-foreground" /> Examiner's Insight
                  </h4>
                  <p className="prose text-muted-foreground text-sm">{device.interactiveExercise.explanation}</p>
                  
                  {selectedOption !== device.interactiveExercise.correctIndex && (
                    <Button variant="outline" className="mt-4" onClick={() => { setSelectedOption(null); setShowExplanation(false); }}>
                      Try Again
                    </Button>
                  )}
                </div>
              )}
            </div>
          </section>
        </article>

        {/* Marginalia / Sidebar */}
        <aside className="md:col-span-4 space-y-8">
          
          {device.memoryTrick && (
            <div className="p-5 rounded-lg border border-border bg-secondary/30 space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center">
                <Lightbulb className="w-3 h-3 mr-1.5" /> Memory Trick
              </h4>
              <p className="text-sm font-medium text-foreground leading-relaxed">{device.memoryTrick}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Why Authors Use It</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{device.whyAuthorsUseIt}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Psychological Effect</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{device.psychologicalEffect}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Reader Effect</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{device.readerEffect}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Emotional Effect</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{device.emotionalEffect}</p>
            </div>
          </div>

          {device.commonMistakes && device.commonMistakes.length > 0 && (
            <div className="pt-6 border-t border-border">
              <h4 className="text-xs font-semibold text-destructive uppercase tracking-widest mb-3 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1.5" /> Common Mistakes
              </h4>
              <ul className="space-y-2">
                {device.commonMistakes.map((mistake, i) => (
                  <li key={i} className="text-sm text-foreground/80 leading-relaxed flex items-start">
                    <span className="mr-2 text-destructive mt-0.5">•</span> {mistake}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-6 border-t border-border">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Commonly found in</h4>
            <div className="flex flex-wrap gap-2">
              {device.commonIn?.map((genre, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-secondary/50">{genre}</Badge>
              ))}
            </div>
          </div>
          
          <div className="pt-6 border-t border-border">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Related Devices</h4>
            <div className="flex flex-wrap gap-2">
              {device.relatedDevices.map((related, i) => (
                <Badge key={i} variant="secondary" className="text-xs cursor-pointer hover:bg-muted" onClick={() => router.push(`/library/${related.toLowerCase()}`)}>
                  {related}
                </Badge>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </PageWrapper>
  );
}
