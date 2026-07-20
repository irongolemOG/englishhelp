"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Compass, 
  Library, 
  Feather, 
  PenTool, 
  Settings, 
  Lightbulb, 
  MessageSquare,
  GraduationCap,
  Layers,
  Zap,
  Bookmark,
  Activity
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background border-r border-border">
      <div className="px-4 py-2 flex-1">
        <Link href="/" className="flex items-center pl-2 mb-10">
          <div className="w-6 h-6 mr-3 bg-foreground rounded-md flex items-center justify-center">
            <BookOpen className="text-background w-4 h-4" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Master Guide
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                href={route.href}
                key={route.href}
                className={cn(
                  "text-sm group flex p-2 w-full justify-start font-medium cursor-pointer rounded-md transition-colors items-center",
                  isActive
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-4 w-4 mr-3", isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="px-4 py-4 border-t border-border">
        <ThemeToggle />
      </div>
    </div>
  );
}
