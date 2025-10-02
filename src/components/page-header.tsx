import { Button } from "./ui/button";
import { Settings } from "lucide-react";

type PageHeaderProps = {
  title: string;
};

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-card/80 backdrop-blur-sm border-b">
      <h1 className="text-3xl font-headline text-primary-foreground font-bold tracking-tight">
         <span className="text-foreground">{title}</span>
      </h1>
      <Button variant="ghost" size="icon">
        <Settings className="h-5 w-5 text-muted-foreground" />
        <span className="sr-only">Settings</span>
      </Button>
    </header>
  );
}
