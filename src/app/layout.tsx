import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import BottomNav from "@/components/bottom-nav";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "HealNCure",
  description: "Your personal guide to mental wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased", "bg-muted/40")}>
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-lg min-h-dvh bg-background shadow-2xl flex flex-col">
            <div className="flex-1 overflow-y-auto pb-20">{children}</div>
            <BottomNav />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
