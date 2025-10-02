import DailyQuote from "@/components/daily-quote";
import PageHeader from "@/components/page-header";
import { Category, categories, quotes } from "@/lib/data";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Suspense } from "react";

const CategoryGrid = () => {
  const categoryImages = PlaceHolderImages.reduce(
    (acc: { [key: string]: any }, img) => {
      acc[img.id] = { url: img.imageUrl, hint: img.imageHint };
      return acc;
    },
    {}
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((category: Category) => (
        <Link href={`/category/${category.slug}`} key={category.id} passHref>
          <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
            <div className="relative w-full aspect-[3/2]">
              <Image
                src={categoryImages[category.slug]?.url}
                alt={category.title}
                fill
                className="object-cover"
                data-ai-hint={categoryImages[category.slug]?.hint}
              />
            </div>
            <div className="p-4 flex-grow">
              <h3 className="font-headline text-lg font-semibold text-foreground">
                {category.title}
              </h3>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

function DailyQuoteLoader() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const quote = quotes[dayOfYear % quotes.length];
  return <DailyQuote quote={quote} />;
}

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="healncure" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
        <Suspense>
          <DailyQuoteLoader />
        </Suspense>
        <section>
          <h2 className="text-2xl font-headline text-foreground/90 mb-4">
            Explore
          </h2>
          <CategoryGrid />
        </section>
      </main>
    </div>
  );
}
