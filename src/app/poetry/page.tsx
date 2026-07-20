"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Feather, BookOpen, Layers, Type, Hash, ArrowRight } from "lucide-react";
import Link from "next/link";

const poetryModules = [
  {
    title: "Structural Architecture",
    description: "Line breaks, stanzas, enjambment, and caesura.",
    icon: Layers,
    link: "/learning-path/structure-enjambment"
  },
  {
    title: "Sound & Rhythm",
    description: "Meter, rhyme schemes, consonance, and assonance.",
    icon: Hash,
    link: "/learning-path/sound-and-rhythm"
  },
  {
    title: "Lexical Choices",
    description: "Diction, semantic fields, and connotations.",
    icon: Type,
    link: "/learning-path/mastering-diction"
  },
  {
    title: "Figurative Language",
    description: "Metaphor, simile, personification, and conceit.",
    icon: BookOpen,
    link: "/learning-path/figurative-language"
  },
  {
    title: "Starting an Analysis",
    description: "The 3 Ts of a perfect Level 7 introduction and thesis.",
    icon: Feather,
    link: "/learning-path/starting-an-analysis"
  },
  {
    title: "Ending an Analysis",
    description: "The 'So What?' conclusion and how to leave a lasting impact.",
    icon: BookOpen,
    link: "/learning-path/ending-poetry-analysis"
  }
];

export default function PoetryPage() {
  return (
    <PageWrapper className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16">
      <header className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Poetry & Prose Masterclass
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Poetry is often the most feared section of Paper 1. This hub contains everything you need to deconstruct unseen poetry like a professional examiner.
        </p>
      </header>

      <section className="border-t border-border pt-12">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">Core Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {poetryModules.map((mod, i) => (
            <Link href={mod.link} key={i} className="group block h-full">
              <div className="h-full border border-border rounded-xl p-6 bg-background hover:bg-secondary/30 transition-colors flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                    <mod.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{mod.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-semibold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors pt-4 border-t border-border/50">
                  Explore Module <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-12 space-y-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">The Examiner's Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              What Examiners Love
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start bg-secondary/20 p-4 rounded-lg border border-border">
                <span className="font-bold text-muted-foreground mr-4 font-serif">1.</span>
                <span className="text-sm text-foreground/80 leading-relaxed">Analyzing the <strong>effect of line breaks</strong> (enjambment/end-stopped) on the reader's pace and emotional state.</span>
              </li>
              <li className="flex items-start bg-secondary/20 p-4 rounded-lg border border-border">
                <span className="font-bold text-muted-foreground mr-4 font-serif">2.</span>
                <span className="text-sm text-foreground/80 leading-relaxed">Identifying the <strong>Volta</strong> (shift in tone/subject) and explaining its thematic significance.</span>
              </li>
              <li className="flex items-start bg-secondary/20 p-4 rounded-lg border border-border">
                <span className="font-bold text-muted-foreground mr-4 font-serif">3.</span>
                <span className="text-sm text-foreground/80 leading-relaxed">Zooming in on <strong>single words</strong> (diction) and exploring their multiple connotations.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              What Examiners Hate
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                <span className="font-bold text-destructive/50 mr-4 font-serif">1.</span>
                <span className="text-sm text-foreground/80 leading-relaxed">Feature spotting: "The author uses a simile here." (Without explaining <strong>why</strong>).</span>
              </li>
              <li className="flex items-start bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                <span className="font-bold text-destructive/50 mr-4 font-serif">2.</span>
                <span className="text-sm text-foreground/80 leading-relaxed">Listing a rhyme scheme (AABB) without explaining how it contributes to the poem's mood.</span>
              </li>
              <li className="flex items-start bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                <span className="font-bold text-destructive/50 mr-4 font-serif">3.</span>
                <span className="text-sm text-foreground/80 leading-relaxed">Vague statements: "This makes the reader interested." (Too generic, applies to anything).</span>
              </li>
            </ul>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}
