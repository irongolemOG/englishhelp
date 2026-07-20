"use client";

import { useParams, useRouter } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import lessonsData from "@/data/lessons.json";
import { Lesson } from "@/types";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, AlertTriangle, Lightbulb, CheckCircle2, GraduationCap, Sparkles, BrainCircuit } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  
  const lesson = lessonsData.find(l => l.id === lessonId) as Lesson | undefined;

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [statsUpdated, setStatsUpdated] = useState(false);

  useEffect(() => {
    if (lesson && completedSteps.length === lesson.content.length && !statsUpdated) {
      setStatsUpdated(true);
      const savedStats = localStorage.getItem("userStats");
      let stats = savedStats ? JSON.parse(savedStats) : {
        level: "Level 1: Absolute Beginner",
        progress: 0,
        streak: 1,
        xp: 0,
        accuracy: 100,
        lessons: 0
      };
      
      const completedLessonIds = JSON.parse(localStorage.getItem("completedLessonIds") || "[]");
      if (!completedLessonIds.includes(lesson.id)) {
        completedLessonIds.push(lesson.id);
        localStorage.setItem("completedLessonIds", JSON.stringify(completedLessonIds));
        
        stats.lessons += 1;
        stats.xp += 500;
        stats.progress = Math.min(100, (stats.lessons / 5) * 100);
        
        if (stats.lessons >= 5) {
          stats.level = "Level 2: Novice Analyst";
        }
        
        localStorage.setItem("userStats", JSON.stringify(stats));
      }
    }
  }, [completedSteps.length, lesson, statsUpdated]);

  if (!lesson) {
    return (
      <PageWrapper className="p-8">
        <h1 className="text-2xl font-bold">Lesson not found.</h1>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </PageWrapper>
    );
  }

  const renderContentBlock = (block: any, index: number) => {
    const isRevealed = index === 0 || completedSteps.includes(index - 1);
    
    if (!isRevealed) {
      return null;
    }

    const markCompleted = () => {
      if (!completedSteps.includes(index)) {
        setCompletedSteps([...completedSteps, index]);
      }
    };

    const isCurrentStep = !completedSteps.includes(index);

    let contentUI;

    switch (block.type) {
      case "text":
        contentUI = (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-foreground/90">{block.content}</p>
          </div>
        );
        break;
      case "analogy":
        contentUI = (
          <div className="bg-secondary/20 border border-border rounded-xl p-6 md:p-8 flex items-start gap-4 shadow-sm">
            <Lightbulb className="w-6 h-6 text-foreground shrink-0 mt-1" />
            <div>
              <h3 className="text-foreground text-lg font-semibold mb-2">Real-life Analogy</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{block.content}</p>
            </div>
          </div>
        );
        break;
      case "mistake":
        contentUI = (
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 md:p-8 flex items-start gap-4 shadow-sm">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-2">Common Mistake</h3>
              <div className="text-base text-destructive/80 leading-relaxed prose-p:my-2" dangerouslySetInnerHTML={{__html: block.content.replace(/\n/g, "<br/>")}} />
            </div>
          </div>
        );
        break;
      case "examiner":
        contentUI = (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 md:p-8 flex items-start gap-4 shadow-sm">
            <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Examiner Expectations</h3>
              <p className="text-base text-emerald-700 dark:text-emerald-200 leading-relaxed">{block.content}</p>
            </div>
          </div>
        );
        break;
      case "example":
        contentUI = (
          <Card className="bg-background border-border shadow-sm">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-semibold text-lg flex items-center mb-4 text-foreground">
                <BookOpen className="w-5 h-5 mr-2 text-muted-foreground" /> Examples
              </h3>
              <div className="whitespace-pre-line text-foreground/80 leading-relaxed font-serif">
                {block.content}
              </div>
            </CardContent>
          </Card>
        );
        break;
      case "visual":
        contentUI = (
          <Card className="bg-secondary/30 border-border p-6 md:p-8">
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-foreground mr-4 shrink-0 mt-1" />
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">{block.content}</p>
            </div>
          </Card>
        );
        break;
      case "quiz":
        contentUI = (
          <QuizBlock 
            quiz={block.metadata} 
            onSuccess={markCompleted} 
            isCompleted={!isCurrentStep} 
          />
        );
        // Quiz handles its own continuation
        break;
      case "task":
        contentUI = (
          <Card className="bg-secondary/10 border-border">
            <CardContent className="p-6 md:p-8 space-y-4">
              <h3 className="font-bold text-xl text-foreground flex items-center">
                <BrainCircuit className="w-6 h-6 mr-3 text-muted-foreground" /> Active Task
              </h3>
              <p className="text-lg text-foreground/90 leading-relaxed">{block.metadata.prompt}</p>
              <div className="flex gap-2 flex-wrap mt-4">
                {block.metadata.hints.map((hint: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-background border border-border rounded-full text-xs font-semibold uppercase tracking-widest text-muted-foreground">Hint: {hint}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        );
        break;
      case "level7":
        contentUI = (
          <Card className="bg-background border-border shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-4">
              <h3 className="font-bold text-xl text-foreground">Level 7 Sample Response</h3>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-serif italic border-l-4 border-foreground/30 pl-6 py-2 bg-secondary/20 rounded-r-md">
                "{block.metadata.text}"
              </p>
            </CardContent>
          </Card>
        );
        break;
      case "takeaway":
      case "summary":
        contentUI = (
          <div className="bg-secondary/30 border border-border rounded-xl p-8 text-center shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-widest mb-3 text-muted-foreground">Key Takeaway</h3>
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">{block.content}</p>
          </div>
        );
        break;
      case "memoryTrick":
        contentUI = (
          <div className="bg-secondary/20 border border-border rounded-xl p-8 text-center shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-widest mb-3 text-muted-foreground">Memory Trick</h3>
            <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed" dangerouslySetInnerHTML={{__html: block.content.replace(/\*\*/g, "")}} />
          </div>
        );
        break;
      default:
        contentUI = <p>{block.content}</p>;
    }

    return (
      <div key={index} className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
        {contentUI}
        
        {isCurrentStep && block.type !== "quiz" && (
          <div className="flex justify-center pt-4">
            <Button onClick={markCompleted} size="lg" className="rounded-full shadow-lg shadow-indigo-500/20 px-8">
              Continue <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <PageWrapper className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto py-12 px-6 space-y-12 pb-32">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground -ml-4" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="space-y-6 pb-6 border-b border-border">
          <div className="inline-flex px-3 py-1 bg-secondary text-foreground border border-border rounded-full text-xs font-semibold uppercase tracking-widest">
            Level {lesson.level}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">{lesson.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{lesson.overview}</p>
          
          <div className="bg-secondary/30 rounded-xl p-6 md:p-8 border border-border space-y-6 mt-8">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Learning Objectives</h3>
            <ul className="space-y-4">
              {lesson.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start text-foreground/90">
                  <CheckCircle2 className="w-5 h-5 mr-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-12">
          {lesson.content.map((block, index) => renderContentBlock(block, index))}
        </div>

        {completedSteps.length === lesson.content.length && (
          <div className="text-center space-y-6 pt-12 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-secondary border border-border rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Lesson Completed!</h2>
            <p className="text-muted-foreground text-lg">You've unlocked the next level.</p>
            <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 mt-4 px-8" onClick={() => router.back()}>
              Return to Previous Page
            </Button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

// Subcomponent for the Quiz Block
function QuizBlock({ quiz, onSuccess, isCompleted }: { quiz: any, onSuccess: () => void, isCompleted: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (index: number) => {
    if (isCompleted || showExplanation) return;
    setSelected(index);
    setShowExplanation(true);
    
    // Auto advance after correct answer
    if (index === quiz.correctIndex) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  return (
    <Card className="border-indigo-500/30 bg-indigo-500/5 overflow-hidden">
      <div className="bg-indigo-500/10 p-4 border-b border-indigo-500/20 flex items-center">
        <BrainCircuit className="w-5 h-5 text-indigo-400 mr-2" />
        <h3 className="font-semibold text-indigo-100">Knowledge Check</h3>
      </div>
      <CardContent className="p-6 space-y-6">
        <p className="text-xl font-medium leading-relaxed">{quiz.question}</p>
        
        <div className="space-y-3">
          {quiz.options.map((option: string, i: number) => {
            const isCorrect = i === quiz.correctIndex;
            const isSelected = i === selected;
            
            let buttonClass = "w-full justify-start h-auto py-4 px-6 text-left whitespace-normal text-base border glass hover:bg-white/10";
            
            if (showExplanation) {
              if (isCorrect) {
                buttonClass = "w-full justify-start h-auto py-4 px-6 text-left whitespace-normal text-base border-emerald-500 bg-emerald-500/20 text-emerald-100";
              } else if (isSelected && !isCorrect) {
                buttonClass = "w-full justify-start h-auto py-4 px-6 text-left whitespace-normal text-base border-destructive bg-destructive/20 text-destructive-foreground";
              } else {
                buttonClass = "w-full justify-start h-auto py-4 px-6 text-left whitespace-normal text-base border-white/5 opacity-50";
              }
            }

            return (
              <Button
                key={i}
                variant="outline"
                className={buttonClass}
                onClick={() => handleSelect(i)}
                disabled={isCompleted || showExplanation}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={cn(
            "p-4 rounded-lg mt-6 animate-in slide-in-from-top-2 fade-in duration-300",
            selected === quiz.correctIndex ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-100" : "bg-destructive/10 border border-destructive/30 text-destructive-100"
          )}>
            <p className="font-semibold mb-1">
              {selected === quiz.correctIndex ? "Excellent!" : "Not quite."}
            </p>
            <p>{quiz.explanation}</p>
            {selected !== quiz.correctIndex && !isCompleted && (
              <Button variant="outline" className="mt-4" onClick={() => { setSelected(null); setShowExplanation(false); }}>
                Try Again
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
