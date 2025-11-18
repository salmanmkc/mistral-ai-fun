import { Mistral } from "@mistralai/mistralai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const embeddingResponse = await mistral.embeddings.create({
      model: "mistral-embed",
      inputs: [text],
    });

    const embedding = embeddingResponse.data?.[0]?.embedding;
    
    return NextResponse.json({
      embedding: embedding || [],
      dimension: embedding?.length || 0,
    });
  } catch (error) {
    console.error("Embeddings API error:", error);
    return NextResponse.json(
      { error: "Failed to generate embeddings" },
      { status: 500 }
    );
  }
}
