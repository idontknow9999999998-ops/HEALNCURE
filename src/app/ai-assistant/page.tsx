"use client";

import { useState, useRef, useEffect, useOptimistic } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, CornerDownLeft, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { submitMessage } from "./actions";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

// Helper to generate a more unique ID
const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function AIAssistantPage() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const category = categories.find((c) => c.slug === categorySlug);
  
  const initialMessage = category 
    ? `I'd like to talk about ${category.title}. Can you give me some advice?` 
    : "Hello! I'd like some advice on mental wellness.";

  const [messages, setMessages] = useState<Message[]>([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], Message>(
    messages,
    (state, newMessage) => [
      ...state,
      newMessage,
    ]
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [optimisticMessages]);

  useEffect(() => {
    if (category && messages.length === 0) {
      setInput(initialMessage);
    }
  }, [category, initialMessage, messages.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateUniqueId(),
      role: "user",
      content: input,
    };

    addOptimisticMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const response = await submitMessage(input);
      const assistantMessage: Message = {
        id: generateUniqueId(),
        role: "assistant",
        content: response,
      };
      setMessages(prev => [...prev, userMessage, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: generateUniqueId(),
        role: "assistant",
        content: "Sorry, I couldn't get a response. Please try again.",
      };
      setMessages(prev => [...prev, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-dvh">
      <PageHeader title="AI Assistant" />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {optimisticMessages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <Avatar className="w-8 h-8 border">
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-xs md:max-w-md rounded-lg px-4 py-2",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === "user" && (
              <Avatar className="w-8 h-8 border">
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8 border">
                    <AvatarFallback>
                        <Bot />
                    </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3 flex items-center">
                    <Loader className="h-5 w-5 animate-spin"/>
                </div>
            </div>
        )}
      </div>

      <div className="p-4 bg-background border-t">
        <form onSubmit={handleSendMessage} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="pr-20 min-h-12 max-h-36"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSendMessage(e);
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 flex items-center">
             <kbd className="hidden md:inline-flex pointer-events-none select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 mr-2">
                <span className="text-xs"><CornerDownLeft /></span> Enter
            </kbd>
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
