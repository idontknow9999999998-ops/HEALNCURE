"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Quote as QuoteIcon } from "lucide-react";
import { quotes } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function QuotesPage() {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedFavorites = localStorage.getItem("favoriteQuotes");
      if (storedFavorites) {
        setFavoriteIds(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
  }, []);

  const toggleFavorite = (id: number) => {
    const newFavoriteIds = new Set(favoriteIds);
    if (newFavoriteIds.has(id)) {
      newFavoriteIds.delete(id);
    } else {
      newFavoriteIds.add(id);
    }
    setFavoriteIds(newFavoriteIds);

    try {
      localStorage.setItem("favoriteQuotes", JSON.stringify(Array.from(newFavoriteIds)));
    } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
    }
  };
  
  const sortedQuotes = [...quotes].sort((a, b) => {
    const aIsFav = favoriteIds.has(a.id);
    const bIsFav = favoriteIds.has(b.id);
    if (aIsFav && !bIsFav) return -1;
    if (!aIsFav && bIsFav) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Quotes" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-4">
          {isClient && sortedQuotes.map((quote) => {
            const isFavorite = favoriteIds.has(quote.id);
            return (
              <Card key={quote.id} className={cn("transition-all", isFavorite ? "bg-accent/20 border-accent" : "")}>
                <CardContent className="p-4 relative">
                  <div className="flex items-start gap-4 pr-10">
                     <QuoteIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                    <div>
                        <blockquote className="font-medium text-foreground/90">
                            {quote.text}
                        </blockquote>
                        <p className="text-sm text-muted-foreground mt-2">&mdash; {quote.author}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => toggleFavorite(quote.id)}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-colors",
                        isFavorite ? "text-accent-foreground fill-current" : "hover:text-accent-foreground"
                      )}
                    />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
          {!isClient && Array.from({length: 5}).map((_, i) => (
             <Card key={i} className="h-28 animate-pulse bg-muted/50" />
          ))}
        </div>
      </main>
    </div>
  );
}
