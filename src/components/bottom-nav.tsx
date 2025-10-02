"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Quote, BarChart3, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/quotes", label: "Quotes", icon: Quote },
  { href: "/progress", label: "Progress", icon: BarChart3 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-16 bg-card border-t border-border/80 shadow-[0_-1px_4px_rgba(0,0,0,0.05)]">
      <nav className="h-full">
        <ul className="flex justify-around items-center h-full px-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.label} className="h-full">
                <Link
                  href={item.href}
                  className="flex flex-col items-center justify-center h-full w-20 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <item.icon
                    className={cn(
                      "h-6 w-6 mb-1 transition-all",
                      isActive ? "text-primary" : ""
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
