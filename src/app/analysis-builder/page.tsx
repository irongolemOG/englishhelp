"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenTool, ArrowRight, BrainCircuit, Lightbulb, AlertTriangle, CheckCircle2, ArrowDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const cognitiveMap = [
  { id: 1, label: "Observation", color: "bg-blue-500", text: "text-blue-500" },
  { id: 2, label: "Language", color: "bg-indigo-500", text: "text-indigo-500" },
  { id: 3, label: "Structure", color: "bg-violet-500", text: "text-violet-500" },
  { id: 4, label: "Interpretation", color: "bg-fuchsia-500", text: "text-fuchsia-500" },
  { id: 5, label: "Authorial Purpose", color: "bg-pink-500", text: "text-pink-500" },
  { id: 6, label: "Reader Effect", color: "bg-rose-500", text: "text-rose-500" },
  { id: 7, label: "Theme", color: "bg-orange-500", text: "text-orange-500" },
  { id: 8, label: "Evaluation", color: "bg-amber-500", text: "text-amber-500" }
];

const mentorSteps = [
  {
    id: 1,
    title: "Step 1: The Observation (What)",
    whyItMatters: "Examiners need to see that you can identify specific textual evidence before you start analyzing. Vague references score poorly.",
    hint: "Don't just quote a whole sentence. Zoom in on a specific phrase or structural choice. What jumps out at you?",
    mistake: "Paraphrasing the quote or summarizing the plot instead of identifying the literary tool.",
    exampleProcess: "Instead of saying 'The author describes a storm', say 'The author employs pathetic fallacy and aggressive verbs like \"lashed\" and \"howled\".'"
  },
  {
    id: 2,
    title: "Step 2: Micro-Analysis (Language & Structure)",
    whyItMatters: "This is where you prove you understand HOW meaning is constructed at the word or sentence level.",
    hint: "Pick ONE word from your quote. What are its connotations? Does it sound harsh? Clinical? Melancholic?",
    mistake: "Saying 'this paints a picture in the reader's head' without explaining the specific connotations of the diction.",
    exampleProcess: "The verb 'howled' connotes primal violence, animalistic fury, and an uncontrollable force, immediately establishing a lack of human control."
  },
  {
    id: 3,
    title: "Step 3: Interpretation (So What?)",
    whyItMatters: "Identifying techniques gets you a Level 4. Interpreting their immediate effect pushes you to a Level 5 or 6.",
    hint: "How does this specific choice change the atmosphere? How does it alter our perception of the character or setting?",
    mistake: "Jumping straight to the global theme without explaining the immediate contextual effect.",
    exampleProcess: "This creates a deeply hostile and claustrophobic atmosphere, isolating the protagonist and heightening the tension of the scene."
  },
  {
    id: 4,
    title: "Step 4: Authorial Purpose & Theme (Why)",
    whyItMatters: "This is the hallmark of a Level 7 student. You must treat the text as a deliberate construct created by an author to convey a message.",
    hint: "Why did the author bother writing this? What is the big picture message about society, human nature, or power?",
    mistake: "Treating characters as real people instead of constructs used by the author to explore a theme.",
    exampleProcess: "The author personifies the storm to represent the oppressive nature of industrialization, suggesting the environment itself is rebelling against human encroachment."
  },
  {
    id: 5,
    title: "Step 5: Evaluation",
    whyItMatters: "Evaluation requires you to judge the effectiveness of the author's choices or offer alternative perspectives.",
    hint: "Is this choice particularly effective? Does it subvert expectations? How might a different audience react?",
    mistake: "Simply stating 'this is very effective' without justifying why.",
    exampleProcess: "Ultimately, this lexical framing forces the reader to recognize their own vulnerability, subverting the Romantic ideal of nature as a passive, comforting entity."
  }
];

export default function AnalysisBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const activeStepData = mentorSteps[currentStep - 1];

  return (
    <PageWrapper className="h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
      
      {/* Header Bar */}
      <header className="shrink-0 border-b border-border bg-background px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-muted-foreground" />
            Analysis Builder Workspace
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Master the cognitive framework for Level 7 analysis.</p>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="font-mono text-xs">{currentStep} / {mentorSteps.length}</Badge>
        </div>
      </header>

      {/* Split Pane Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Pane: Navigation / Cognitive Steps */}
        <aside className="w-full md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-border bg-secondary/20 overflow-x-auto md:overflow-x-visible md:overflow-y-auto no-scrollbar">
          <div className="p-3 md:p-4">
            <h2 className="hidden md:block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 px-2">The Framework</h2>
            <nav className="flex md:flex-col gap-2 md:gap-0 md:space-y-1">
              {mentorSteps.map((step) => {
                const isActive = currentStep === step.id;
                const isPast = currentStep > step.id;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={cn(
                      "w-[200px] md:w-full shrink-0 flex flex-col text-left px-4 py-3 rounded-md transition-colors",
                      isActive 
                        ? "bg-background border border-border shadow-sm" 
                        : "hover:bg-secondary/50 text-muted-foreground border border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={cn("text-xs font-mono font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                        Phase 0{step.id}
                      </span>
                      {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                    <span className={cn("text-sm font-medium line-clamp-1", isActive ? "text-foreground" : "")}>
                      {step.title.split(': ')[1]}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Pane: Active Workspace */}
        <main className="flex-1 flex flex-col bg-background relative overflow-hidden">
          
          <div className="flex-1 overflow-y-auto p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-12 pb-8">
              
              <header className="space-y-2 border-b border-border pb-6">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Phase 0{activeStepData.id}</div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                {activeStepData.title.split(': ')[1]}
              </h2>
            </header>

            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" key={currentStep}>
              
              {/* Why it matters */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center">
                  <Lightbulb className="w-3.5 h-3.5 mr-2" /> Why This Matters
                </h3>
                <p className="text-lg text-foreground leading-relaxed pl-4 border-l-2 border-foreground/20">
                  {activeStepData.whyItMatters}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Mentor Hint */}
                <div className="p-6 rounded-lg border border-border bg-secondary/30 space-y-3">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest flex items-center">
                    <PenTool className="w-3.5 h-3.5 mr-2 text-muted-foreground" /> Mentor Hint
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeStepData.hint}
                  </p>
                </div>

                {/* Common Mistake */}
                <div className="p-6 rounded-lg border border-destructive/20 bg-destructive/5 space-y-3">
                  <h3 className="text-xs font-semibold text-destructive uppercase tracking-widest flex items-center">
                    <AlertTriangle className="w-3.5 h-3.5 mr-2" /> Fatal Mistake
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {activeStepData.mistake}
                  </p>
                </div>
              </div>

              {/* Example Thought Process */}
              <section className="p-6 md:p-8 rounded-lg border border-border bg-background shadow-sm space-y-4 overflow-hidden">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Example Thought Process</h3>
                <blockquote className="text-lg md:text-xl font-serif italic text-foreground leading-relaxed break-words">
                  "{activeStepData.exampleProcess}"
                </blockquote>
              </section>

            </div>

            </div>
          </div>

          {/* Fixed Footer for Right Pane */}
          <div className="shrink-0 bg-background border-t border-border p-4 md:px-12 flex justify-end z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            {currentStep < mentorSteps.length ? (
              <Button onClick={() => setCurrentStep(prev => prev + 1)} className="px-8 font-medium">
                Next Phase <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => setCurrentStep(1)} variant="outline" className="px-8 font-medium border-border">
                <CheckCircle2 className="w-4 h-4 mr-2 text-muted-foreground" /> Restart Framework
              </Button>
            )}
          </div>
        </main>
        
      </div>

    </PageWrapper>
  );
}
