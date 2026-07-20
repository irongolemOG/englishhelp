"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import themesData from "@/data/themes.json";
import { Theme } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Layers, ArrowRight, Paintbrush, FileText, Target, Eye } from "lucide-react";
import { useState } from "react";

export default function ThemesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const typedThemes = themesData as Theme[];

  return (
    <PageWrapper className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      <header className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Literary Themes
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Themes are the underlying messages of a text. Explore common IB themes, their associated motifs, and exactly what examiners are looking for when you write about them.
        </p>
      </header>

      <section className="border-t border-border pt-4">
        <div className="space-y-6">
          {typedThemes.map((theme) => {
            const isExpanded = expandedId === theme.id;
            
            return (
              <div key={theme.id} className="border border-border rounded-xl overflow-hidden bg-background transition-colors hover:border-border/80">
                <div 
                  className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-secondary/30 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : theme.id)}
                >
                  <div className="space-y-3 flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {theme.name}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                      {theme.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Badge variant="outline" className="bg-secondary text-foreground hover:bg-secondary/80 border-border">
                      {isExpanded ? "Collapse" : "Explore"}
                    </Badge>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-6 md:p-8 border-t border-border bg-secondary/10 animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      
                      {/* Left Column: Elements */}
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center">
                            <Eye className="w-4 h-4 mr-2" /> Common Symbols & Motifs
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {theme.commonSymbols.map(s => (
                              <Badge key={s} variant="secondary" className="bg-background border border-border text-foreground">{s}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center">
                            <Paintbrush className="w-4 h-4 mr-2" /> Associated Colours
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {theme.colours.map(c => (
                              <Badge key={c} variant="outline" className="border-border text-muted-foreground">{c}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center">
                            <Target className="w-4 h-4 mr-2" /> Typical Techniques
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {theme.typicalTechniques.map(t => (
                              <Badge key={t} variant="secondary" className="bg-background border border-border text-foreground">{t}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Examiner Focus */}
                      <div className="space-y-8">
                        <div className="bg-background border border-border rounded-lg p-6 space-y-4 shadow-sm">
                          <h4 className="text-sm font-semibold text-foreground flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-muted-foreground" /> Typical Examiner Questions
                          </h4>
                          <ul className="space-y-3">
                            {theme.questionsExaminersAsk?.map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start">
                                <span className="mr-2 text-foreground/40 font-serif">Q.</span> {q}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                            Level 7 Thesis Arguments
                          </h4>
                          <ul className="space-y-3 bg-secondary/50 p-4 rounded-md border border-border">
                            {theme.typicalArguments?.map((a, i) => (
                              <li key={i} className="text-sm md:text-base text-foreground/90 leading-relaxed font-medium flex items-start">
                                <span className="mr-2 text-muted-foreground font-serif">Arg {i+1}:</span> {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
}
