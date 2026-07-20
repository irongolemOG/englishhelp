"use client";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bookmark, Library, Settings } from "lucide-react";

export default function BookmarksPage() {
  return (
    <PageWrapper className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-[calc(100vh-4rem)]">
      <header className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Your Bookmarks
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          Everything you've saved for later review.
        </p>
      </header>
      
      <div className="flex-1 border border-dashed border-border bg-secondary/10 rounded-xl flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
          <Bookmark className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-3">No bookmarks yet</h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          When you find a literary device, theme, or vocabulary word you want to review later, click the bookmark icon to save it here.
        </p>
      </div>
    </PageWrapper>
  );
}
