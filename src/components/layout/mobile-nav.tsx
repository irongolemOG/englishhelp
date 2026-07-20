"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, Compass, Library, Feather, PenTool, Settings, MessageSquare, GraduationCap, Layers, Zap, Bookmark, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Dashboard", icon: Compass, href: "/" },
  { label: "Learning Path", icon: GraduationCap, href: "/learning-path" },
  { label: "Literary Devices", icon: Library, href: "/library" },
  { label: "Vocabulary", icon: MessageSquare, href: "/vocabulary" },
  { label: "Themes", icon: Layers, href: "/themes" },
  { label: "Poetry & Prose", icon: Feather, href: "/poetry" },
  { label: "Analysis Builder", icon: PenTool, href: "/analysis-builder" },
  { label: "Flashcards", icon: Zap, href: "/flashcards" },
  { label: "Practice", icon: Activity, href: "/practice" },
  { label: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close the menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const drawerContent = (
    <div className="md:hidden">
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-[85%] max-w-sm bg-background border-r border-border z-[101] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-md flex items-center justify-center">
              <BookOpen className="text-background w-5 h-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-foreground">Master Guide</span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-secondary text-foreground" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <route.icon className={cn("w-5 h-5", isActive ? "text-foreground" : "text-muted-foreground")} />
                  {route.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
        aria-label="Open Navigation Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {mounted && createPortal(drawerContent, document.body)}
    </div>
  );
}
