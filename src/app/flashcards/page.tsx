"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import flashcardsData from "@/data/flashcards.json";
import { Flashcard } from "@/types";
import { Button } from "@/components/ui/button";
import { Zap, RotateCcw, Check, X, Bookmark, Brain } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards] = useState<Flashcard[]>(flashcardsData as Flashcard[]);
  const [studiedCount, setStudiedCount] = useState(0);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setStudiedCount(prev => prev + 1);
    }, 150); // wait for flip animation to start
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setStudiedCount(0);
    setIsFlipped(false);
  };

  return (
    <PageWrapper className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-[calc(100vh-4rem)]">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Active Recall
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Test your knowledge of literary devices, structural features, and analytical vocabulary.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-secondary/50 border border-border px-4 py-2 rounded-full">
          <Brain className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Cards Studied: <span className="font-mono">{studiedCount}</span></span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        
        {/* The Card Container */}
        <div className="relative w-full max-w-2xl aspect-[4/3] md:aspect-[16/9] perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={cn(
            "w-full h-full relative preserve-3d transition-transform duration-700 ease-spring rounded-2xl shadow-xl",
            isFlipped ? "rotate-y-180" : ""
          )}>
            
            {/* Front of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-background border border-border flex flex-col items-center justify-center p-12 text-center shadow-sm">
              <div className="absolute top-6 right-6">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
                  <Bookmark className="w-5 h-5" />
                </Button>
              </div>
              <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-6 bg-secondary px-3 py-1 rounded-full">Literary Device</span>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">{currentCard.device}</h2>
              <p className="absolute bottom-6 text-sm text-muted-foreground font-medium animate-pulse">Click to reveal</p>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-secondary/30 border border-border rotate-y-180 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <div className="space-y-8 my-auto">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 border-b border-border/50 pb-2">Definition</h4>
                  <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed font-serif italic">{currentCard.definition}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 border-b border-border/50 pb-2">Purpose</h4>
                    <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{currentCard.purpose}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 border-b border-border/50 pb-2 flex items-center">
                      Level 7 Analysis
                    </h4>
                    <p className="text-sm md:text-base text-foreground/90 font-medium leading-relaxed bg-background p-4 rounded-md border border-border">
                      {currentCard.ibAnalysis}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 w-full max-w-2xl">
          {!isFlipped ? (
            <div className="text-center">
              <Button onClick={() => setIsFlipped(true)} size="lg" className="rounded-full px-12 font-medium text-lg h-14">
                Reveal Answer
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <Button onClick={handleNext} variant="outline" className="h-16 text-lg border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
                <X className="w-5 h-5 mr-2" /> Again
              </Button>
              <Button onClick={handleNext} variant="outline" className="h-16 text-lg border-border hover:bg-orange-500/10 hover:text-orange-600 hover:border-orange-500/30 transition-colors">
                Hard
              </Button>
              <Button onClick={handleNext} variant="outline" className="h-16 text-lg border-border hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-500/30 transition-colors">
                <Check className="w-5 h-5 mr-2" /> Easy
              </Button>
            </div>
          )}
          
          <div className="flex justify-center mt-12">
            <Button variant="ghost" onClick={resetSession} className="text-muted-foreground hover:text-foreground text-sm">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset Session
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
