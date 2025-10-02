import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/lib/data";
import { Bot, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === category.slug);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={category.title} />
      <main className="flex-1 overflow-y-auto">
        <div className="relative h-48 w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={category.title}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <p className="text-lg text-muted-foreground">{category.description}</p>

          <Button asChild size="lg" className="w-full">
            <Link href={`/ai-assistant?category=${category.slug}`}>
              <Bot className="mr-2 h-5 w-5" />
              Chat with AI Assistant
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Learn More</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="symptoms">
                  <AccordionTrigger>Symptoms</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {category.details.symptoms.map((symptom) => (
                        <li key={symptom}>{symptom}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="causes">
                  <AccordionTrigger>Common Causes</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {category.details.causes.map((cause) => (
                        <li key={cause}>{cause}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="effects">
                  <AccordionTrigger>Potential Effects</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {category.details.effects.map((effect) => (
                        <li key={effect}>{effect}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
