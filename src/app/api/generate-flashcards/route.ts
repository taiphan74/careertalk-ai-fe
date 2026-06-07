/**
 * API Route: POST /api/generate-flashcards
 * Nhận profile người dùng, gọi Ollama gemma3:e4b để sinh flashcards.
 */
import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const inputSchema = z.object({
  occupation: z.string().min(1),
  goal: z.string().min(1),
  level: z.string().min(1),
});

const cardSchema = z.object({
  front: z.string(),
  back: z.string(),
  example: z.string().optional(),
  pronunciation: z.string().optional(),
  tags: z.array(z.string()),
});

const responseSchema = z.object({
  deckName: z.string(),
  description: z.string(),
  cards: z.array(cardSchema),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = inputSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error },
        { status: 400 }
      );
    }

    const { occupation, goal, level } = validation.data;

    const ollama = createOpenAI({
      baseURL: "http://localhost:11434/v1",
      apiKey: "ollama",
    });

    const systemPrompt = `You are an English learning assistant specialized in creating educational flashcards.

Generate a set of 10-15 relevant English flashcards for a learner with this profile:
- Occupation: ${occupation}
- Goal: ${goal}
- Level: ${level}

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "deckName": "Descriptive name for the deck",
  "description": "Brief description of what this deck covers",
  "cards": [
    {
      "front": "English word or phrase",
      "back": "Vietnamese translation",
      "example": "Example sentence in English (optional)",
      "pronunciation": "/IPA notation/ (optional)",
      "tags": ["relevant", "tags"]
    }
  ]
}`;

    const { text } = await generateText({
      model: ollama("gemma3:e4b"),
      system: systemPrompt,
      prompt: "Generate the flashcards now.",
    });

    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
    }

    const responseValidation = responseSchema.safeParse(parsed);
    if (!responseValidation.success) {
      console.error("AI response validation failed:", responseValidation.error);
      return NextResponse.json({ error: "AI response missing required fields" }, { status: 500 });
    }

    return NextResponse.json(responseValidation.data);
  } catch (error) {
    console.error("Flashcard generation error:", error);
    return NextResponse.json({
      deckName: "Error - Try Again",
      description: "Failed to generate flashcards. Please try again.",
      cards: [],
    }, { status: 500 });
  }
}
