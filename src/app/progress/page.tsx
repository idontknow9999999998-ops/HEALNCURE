"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  DotProps,
} from "recharts";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type Mood = "happy" | "calm" | "neutral" | "anxious" | "sad";
type MoodLog = {
  date: string;
  stress: number;
  mood: Mood;
};

const moodColors: Record<Mood, string> = {
  happy: "hsl(var(--chart-4))",
  calm: "hsl(var(--chart-1))",
  neutral: "hsl(var(--foreground))",
  anxious: "hsl(var(--chart-5))",
  sad: "hsl(var(--chart-2))",
};

const initialData: MoodLog[] = [
  { date: "2024-07-15", stress: 4, mood: "calm" },
  { date: "2024-07-16", stress: 6, mood: "anxious" },
  { date: "2024-07-17", stress: 5, mood: "neutral" },
  { date: "2024-07-18", stress: 7, mood: "sad" },
  { date: "2024-07-19", stress: 3, mood: "happy" },
  { date: "2024-07-20", stress: 2, mood: "calm" },
  { date: "2024-07-21", stress: 5, mood: "neutral" },
];

const CustomDot = (props: DotProps & { payload: MoodLog }) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={moodColors[payload.mood]}
      stroke="hsl(var(--background))"
      strokeWidth={2}
    />
  );
};

export default function ProgressPage() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<MoodLog[]>(initialData);
  const [stressLevel, setStressLevel] = useState(5);
  const [mood, setMood] = useState<Mood>("neutral");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddLog = () => {
    const newLog: MoodLog = {
      date: format(new Date(), "yyyy-MM-dd"),
      stress: stressLevel,
      mood: mood,
    };
    
    // Check if a log for today already exists
    const todayLogIndex = logs.findIndex(log => log.date === newLog.date);

    let updatedLogs;
    if (todayLogIndex > -1) {
      // Replace today's log
      updatedLogs = [...logs];
      updatedLogs[todayLogIndex] = newLog;
    } else {
      // Add new log
      updatedLogs = [...logs, newLog];
    }
    
    // Sort logs by date
    updatedLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setLogs(updatedLogs);
    toast({
      title: "Progress Logged",
      description: "Your mood and stress level have been saved.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Progress" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">How are you today?</CardTitle>
            <CardDescription>
              Log your mood and stress level to track your progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Stress Level: {stressLevel}</Label>
              <Slider
                value={[stressLevel]}
                onValueChange={(val) => setStressLevel(val[0])}
                max={10}
                step={1}
              />
            </div>
            <div className="space-y-3">
              <Label>Mood</Label>
              <RadioGroup
                value={mood}
                onValueChange={(val: Mood) => setMood(val)}
                className="flex flex-wrap gap-4"
              >
                {(Object.keys(moodColors) as Mood[]).map((m) => (
                  <div key={m} className="flex items-center space-x-2">
                    <RadioGroupItem value={m} id={m} />
                    <Label htmlFor={m} className="capitalize">
                      {m}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button onClick={handleAddLog} className="w-full">
              Log Progress
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Journey</CardTitle>
            <CardDescription>
              A visual representation of your stress levels over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={logs}
                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="date"
                      tickFormatter={(str) => format(new Date(str), "MMM d")}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      domain={[0, 10]}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      labelFormatter={(label) => format(new Date(label), "PPP")}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="stress"
                      stroke="hsl(var(--primary-foreground))"
                      strokeWidth={2}
                      dot={<CustomDot payload={{
                        date: '',
                        stress: 0,
                        mood: 'neutral'
                      }} />}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
             <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-muted-foreground">
                <p className="font-semibold">Mood Legend:</p>
                {Object.entries(moodColors).map(([mood, color]) => (
                    <div key={mood} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                        <span className="capitalize">{mood}</span>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
