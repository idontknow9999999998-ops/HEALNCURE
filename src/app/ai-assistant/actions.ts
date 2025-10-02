"use server";

import { aiChatAssistant } from "@/ai/flows/ai-chat-assistant";

export async function submitMessage(message: string): Promise<string> {
  try {
    const result = await aiChatAssistant({ message });
    return result.response;
  } catch (error) {
    console.error("Error in AI chat assistant:", error);
    return "I'm sorry, but I encountered an error. Please try again later.";
  }
}
