// This endpoint is for CopilotKit integration
// For now, we'll use the /api/chat endpoint directly
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({ 
    message: "Please use /api/chat endpoint for chat functionality" 
  });
}
