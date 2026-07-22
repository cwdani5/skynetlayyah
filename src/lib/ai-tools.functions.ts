import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const HumanizeInput = z.object({ text: z.string().min(1).max(8000) });
const DetectInput = z.object({ text: z.string().min(1).max(8000) });

export const humanizeText = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => HumanizeInput.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    const { text } = await generateText({
      model: gateway("google/gemini-2.5-flash"),
      system:
        "You are a humanizer. Rewrite the given text so it reads naturally like a thoughtful human wrote it — vary sentence length, use casual phrasing where fitting, remove robotic patterns, avoid repetitive structures, keep meaning intact. Return ONLY the rewritten text, no preface, no explanation.",
      prompt: data.text,
    });
    return { output: text.trim() };
  });

export const detectAiText = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => DetectInput.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    const { text } = await generateText({
      model: gateway("google/gemini-2.5-flash"),
      system:
        'You are an AI-text detector. Analyze the given text and estimate the probability (0-100) that it was AI-generated. Consider perplexity, burstiness, repetitive phrasing, generic transitions, and unnatural uniformity. Respond with ONLY a compact JSON object: {"aiScore": number, "verdict": "Human" | "Likely Human" | "Mixed" | "Likely AI" | "AI", "reasons": [string, string, string]}. No markdown, no code fences.',
      prompt: data.text,
    });
    const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    try {
      const parsed = JSON.parse(cleaned) as {
        aiScore: number;
        verdict: string;
        reasons: string[];
      };
      return parsed;
    } catch {
      return { aiScore: 50, verdict: "Mixed", reasons: ["Could not parse model output"] };
    }
  });
