"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import vocabularyData from "@/data/vocabulary.json";
import { VocabularyItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, AlertTriangle, ArrowRight, Type, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const typedVocab = vocabularyData as VocabularyItem[];
  const categories = ["All", ...Array.from(new Set(typedVocab.map(v => v.category)))];

  const filteredVocab = typedVocab.filter((item) => {
    const matchesSearch = item.word.toLowerCase().includes(search.toLowerCase()) || 
                          item.meaning.toLowerCase().includes(search.toLowerCase()) ||
                          item.replaces.some(r => r.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Analytical Vocabulary
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Stop saying "shows" or "displays". Upgrade your analytical vocabulary to write with the precision of an examiner. Search for a basic word below to find a stronger alternative.
            </p>
          </div>
          
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search (e.g., 'shows')..."
              className="pl-10 h-12 bg-background border-border focus-visible:ring-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {categories.map(category => (
            <Badge 
              key={category} 
              variant={selectedCategory === category ? "default" : "secondary"}
              className={cn(
                "cursor-pointer text-xs py-1.5 px-4 transition-colors font-medium rounded-full",
                selectedCategory === category 
                  ? "bg-foreground text-background" 
                  : "bg-secondary text-foreground hover:bg-secondary/70 border-border"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </header>

      <section className="border-t border-border pt-4">
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-widest border-b border-border/50">
          <div className="col-span-3">Vocabulary Word</div>
          <div className="col-span-4">Meaning & Usage</div>
          <div className="col-span-5">Analysis Example</div>
        </div>

        <div className="divide-y divide-border">
          {filteredVocab.map((item: VocabularyItem) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 px-4 py-8 items-start hover:bg-secondary/30 transition-colors rounded-lg md:rounded-none">
              
              <div className="md:col-span-3 space-y-3">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground border-border bg-background mb-1">
                    {item.category}
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground flex items-center">
                    {item.word}
                  </h2>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Replaces</span>
                  <div className="flex flex-wrap gap-1">
                    {item.replaces.map((r, i) => (
                      <span key={i} className="text-xs text-destructive/80 bg-destructive/10 px-1.5 py-0.5 rounded border border-destructive/20 line-through">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 space-y-4 pr-4">
                <p className="text-foreground font-medium leading-relaxed">
                  {item.meaning}
                </p>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> When To Use
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.whenToUse}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-destructive uppercase tracking-widest flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" /> When NOT To Use
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.whenNotToUse}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 space-y-3 bg-secondary/20 p-5 rounded-lg border border-border">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Level 7 Example</span>
                <p className="text-sm text-foreground/90 italic leading-relaxed font-serif">
                  "{item.examples[0]}"
                </p>
              </div>

            </div>
          ))}
        </div>

        {filteredVocab.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">No vocabulary words found matching "{search}".</p>
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
