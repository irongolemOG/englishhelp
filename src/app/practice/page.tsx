"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Clock, Timer, FileText, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const practicePrompts = [
  {
    id: 1,
    title: "Unseen Poetry Extract",
    type: "Timed Mode",
    time: "20 mins",
    difficulty: "Advanced",
    extract: `I met a traveller from an antique land,
Who said—“Two vast and trunkless legs of stone
Stand in the desert. . . . Near them, on the sand,
Half sunk a shattered visage lies, whose frown,
And wrinkled lip, and sneer of cold command,
Tell that its sculptor well those passions read
Which yet survive, stamped on these lifeless things,
The hand that mocked them, and the heart that fed;
And on the pedestal, these words appear:
My name is Ozymandias, King of Kings;
Look on my Works, ye Mighty, and despair!
Nothing beside remains. Round the decay
Of that colossal Wreck, boundless and bare
The lone and level sands stretch far away.”`,
    source: "Percy Bysshe Shelley, 'Ozymandias'",
    guidingQuestion: "Analyze how the poet's use of imagery and structure conveys the ephemeral nature of power and human arrogance."
  },
  {
    id: 2,
    title: "Unseen Prose Extract",
    type: "Timed Mode",
    time: "30 mins",
    difficulty: "Intermediate",
    extract: "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.\n\nThe hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features.",
    source: "George Orwell, '1984'",
    guidingQuestion: "How does the author establish a dystopian atmosphere in the opening paragraphs through sensory details and setting?"
  }
];

export default function PracticePage() {
  const [activePromptIndex, setActivePromptIndex] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [checklist, setChecklist] = useState<number[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  const prompt = activePromptIndex !== null ? practicePrompts[activePromptIndex] : practicePrompts[0];

  const handleStart = (index: number) => {
    setActivePromptIndex(index);
    setTimeLeft(parseInt(practicePrompts[index].time) * 60);
    setChecklist([]);
    setIsStarted(true);
  };

  const toggleChecklist = (index: number) => {
    if (checklist.includes(index)) {
      setChecklist(checklist.filter(i => i !== index));
    } else {
      setChecklist([...checklist, index]);
    }
  };

  const handleSubmit = () => {
    // Update stats
    const savedStats = localStorage.getItem("userStats");
    let stats = savedStats ? JSON.parse(savedStats) : {
      level: "Level 1: Absolute Beginner",
      progress: 0,
      streak: 1,
      xp: 0,
      accuracy: 100,
      lessons: 0
    };
    
    // Add XP for practice
    stats.xp += 250;
    
    // Slight bump to accuracy if they used the checklist
    if (checklist.length > 0) {
      stats.accuracy = Math.min(100, stats.accuracy + 2);
    }
    
    localStorage.setItem("userStats", JSON.stringify(stats));
    
    setIsStarted(false);
  };



  return (
    <PageWrapper className={cn("mx-auto", isStarted ? "max-w-full p-0" : "max-w-4xl p-6 md:p-12 space-y-16")}>
      
      {!isStarted ? (
        <>
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Exam Practice
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Simulate Paper 1 unseen extracts. Practice annotating, planning, and writing under timed conditions.
            </p>
          </header>

          <div className="space-y-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest border-b border-border pb-2">Available Papers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practicePrompts.map((p, index) => (
                <div key={p.id} className="p-6 rounded-lg border border-border bg-background hover:bg-secondary/30 transition-colors flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground bg-secondary px-2.5 py-1 rounded-full">{p.type}</span>
                      <span className="text-xs font-medium text-muted-foreground flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5" /> {p.time}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">Source: {p.source}</p>
                    </div>
                  </div>
                  <Button className="w-full font-medium" onClick={() => handleStart(index)}>
                    Start Paper
                  </Button>
                </div>
              ))}
              
              <div className="p-6 rounded-lg border border-dashed border-border bg-transparent opacity-60 flex flex-col justify-center items-center text-center space-y-2">
                <h3 className="text-lg font-medium text-muted-foreground">Prose Extract (1 Page)</h3>
                <p className="text-sm text-muted-foreground">Unlocks after completing 5 poetry practices.</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen flex flex-col lg:flex-row bg-background">
          
          {/* Mobile Timer Sticky Header */}
          <div className="lg:hidden sticky top-0 z-50 px-6 py-4 border-b border-border bg-background/90 backdrop-blur-md flex items-center justify-between shadow-sm">
             <div className="flex items-center text-muted-foreground font-medium text-sm">
                <Timer className="w-4 h-4 mr-2" /> Time Remaining
             </div>
             <div className="text-xl font-mono font-bold text-foreground tabular-nums">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
             </div>
          </div>

          {/* Left Pane: Reading Extract */}
          <div className="flex-1 lg:border-r border-border overflow-y-auto bg-[#faf9f6] dark:bg-[#111] p-8 md:p-16">
            <div className="max-w-2xl mx-auto space-y-12">
              <div className="space-y-4 border-b border-border/50 pb-8">
                <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-widest font-semibold">
                  <span>Paper 1 Practice</span>
                  <span>{prompt.difficulty}</span>
                </div>
                <h2 className="text-2xl font-serif text-foreground italic">{prompt.source}</h2>
              </div>
              
              <div className="prose prose-lg prose-serif text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {prompt.extract}
              </div>
            </div>
          </div>

          {/* Right Pane: Workspace & Tools */}
          <div className="w-full lg:w-[400px] shrink-0 bg-secondary/10 overflow-y-auto flex flex-col">
            
            {/* Timer Header */}
            <div className="p-6 border-b border-border bg-background hidden lg:flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center text-muted-foreground font-medium text-sm">
                <Timer className="w-4 h-4 mr-2" /> Time Remaining
              </div>
              <div className="text-2xl font-mono font-bold text-foreground tabular-nums">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>

            <div className="p-6 space-y-8 flex-1">
              {/* Guiding Question */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center">
                  <FileText className="w-3.5 h-3.5 mr-2" /> Guiding Question
                </h3>
                <div className="p-5 rounded-md border border-foreground/10 bg-background shadow-sm">
                  <p className="text-sm font-medium text-foreground leading-relaxed">{prompt.guidingQuestion}</p>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Exam Checklist</h3>
                <div className="p-5 rounded-md border border-border bg-background/50 space-y-4">
                  {[
                    "Read extract twice",
                    "Identify 3 main themes",
                    "Highlight key structural shifts",
                    "Draft thesis statement"
                  ].map((task, i) => {
                    const isChecked = checklist.includes(i);
                    return (
                      <label key={i} className="flex items-start gap-3 cursor-pointer group" onClick={() => toggleChecklist(i)}>
                        <div className={cn("w-4 h-4 rounded border flex items-center justify-center mt-0.5 transition-colors", isChecked ? "bg-primary border-primary text-primary-foreground" : "border-border group-hover:border-foreground")}>
                          {isChecked && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span className={cn("text-sm transition-colors", isChecked ? "text-muted-foreground line-through opacity-70" : "text-muted-foreground group-hover:text-foreground")}>{task}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-border bg-background space-y-3">
              <Button className="w-full font-medium" onClick={handleSubmit}>
                Submit Plan
              </Button>
              <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setIsStarted(false)}>
                Abandon Practice
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
