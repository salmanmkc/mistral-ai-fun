import { Mistral } from "@mistralai/mistralai";
import { NextRequest } from "next/server";

export const runtime = "edge";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, language = "python" } = await req.json();

    const systemPrompt = `You are an expert programmer. Generate clean, well-commented ${language} code based on the user's request. Only respond with code, no explanations unless asked.`;

    const chatStream = await mistral.chat.stream({
      model: "codestral-latest",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatStream) {
            const content = chunk.data.choices[0]?.delta?.content;
            if (content && typeof content === 'string') {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Code generation API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate code" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
