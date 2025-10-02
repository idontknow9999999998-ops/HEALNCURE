import { Card, CardContent } from "@/components/ui/card";
import { Quote as QuoteIcon } from "lucide-react";
import type { Quote } from "@/lib/types";

type DailyQuoteProps = {
  quote: Quote;
};

export default function DailyQuote({ quote }: DailyQuoteProps) {
  return (
    <section aria-labelledby="quote-of-the-day">
      <Card className="bg-primary border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <QuoteIcon className="h-6 w-6 text-primary-foreground/50 shrink-0 mt-1" />
            <div>
              <blockquote className="text-lg font-medium text-primary-foreground/90">
                {quote.text}
              </blockquote>
              <p className="text-sm text-primary-foreground/70 mt-2">
                &mdash; {quote.author}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
