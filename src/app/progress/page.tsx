"use client";

import { useState, useEffect, useMemo } from "react";
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
import {
  addDocumentNonBlocking,
  useAuth,
  useCollection,
  useFirestore,
  useMemoFirebase,
  useUser,
} from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

type Mood = "happy" | "calm" | "neutral" | "anxious" | "sad";
type MoodLog = {
  id?: string;
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
  { date: "2025-01-15", stress: 4, mood: "calm" },
  { date: "2025-01-16", stress: 6, mood: "anxious" },
  { date: "2025-01-17", stress: 5, mood: "neutral" },
  { date: "2025-01-18", stress: 7, mood: "sad" },
  { date: "2025-01-19", stress: 3, mood: "happy" },
  { date: "2025-01-20", stress: 2, mood: "calm" },
  { date: "2025-01-21", stress: 5, mood: "neutral" },
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

const SignInPrompt = () => {
  const auth = useAuth();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Track Your Progress</CardTitle>
        <CardDescription>
          Sign in to save your mood and stress levels over time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => initiateAnonymousSignIn(auth)} className="w-full">
          Sign In Anonymously
        </Button>
      </CardContent>
    </Card>
  );
};

export default function ProgressPage() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const progressCollectionRef = useMemoFirebase(
    () => (user ? collection(firestore, "users", user.uid, "progress") : null),
    [user, firestore]
  );

  const {
    data: logs,
    isLoading: areLogsLoading,
    error,
  } = useCollection<MoodLog>(progressCollectionRef);

  const [stressLevel, setStressLevel] = useState(5);
  const [mood, setMood] = useState<Mood>("neutral");
  const [isClient, setIsClient] = useState(false);

  const sortedLogs = useMemo(() => {
    const data = logs ?? (user ? [] : initialData);
    return [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [logs, user]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddLog = async () => {
    if (!user) return;

    const today = format(new Date(), "yyyy-MM-dd");
    const newLog: MoodLog = {
      date: today,
      stress: stressLevel,
      mood: mood,
    };

    const todayLog = logs?.find((log) => log.date === today);

    if (todayLog && todayLog.id) {
      // Update today's log
      const docRef = doc(
        firestore,
        "users",
        user.uid,
        "progress",
        todayLog.id
      );
      await setDoc(docRef, newLog, { merge: true });
    } else {
      // Add new log
      addDocumentNonBlocking(progressCollectionRef!, newLog);
    }

    toast({
      title: "Progress Logged",
      description: "Your mood and stress level have been saved.",
    });
  };

  const renderContent = () => {
    if (isUserLoading || (user && areLogsLoading)) {
      return (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (!user) {
      return <SignInPrompt />;
    }

    return (
      <>
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
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Could not load your progress data. Please try again later.
                </AlertDescription>
              </Alert>
            )}
            <div className="h-64 w-full">
              {isClient && sortedLogs.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={sortedLogs}
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
               {isClient && sortedLogs.length === 0 && !areLogsLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                      <p>No progress logged yet.</p>
                      <p className="text-sm">Start by logging your mood today!</p>
                  </div>
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-muted-foreground">
              <p className="font-semibold">Mood Legend:</p>
              {Object.entries(moodColors).map(([mood, color]) => (
                <div key={mood} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="capitalize">{mood}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Progress" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {renderContent()}
      </main>
    </div>
  );
}