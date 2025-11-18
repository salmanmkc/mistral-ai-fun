import { Mistral } from "@mistralai/mistralai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

// Define example tools
const tools = [
  {
    type: "function" as const,
    function: {
      name: "get_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          unit: {
            type: "string",
            enum: ["celsius", "fahrenheit"],
            description: "The temperature unit to use",
          },
        },
        required: ["location"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "calculate",
      description: "Perform mathematical calculations",
      parameters: {
        type: "object",
        properties: {
          expression: {
            type: "string",
            description: "The mathematical expression to evaluate",
          },
        },
        required: ["expression"],
      },
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await mistral.chat.complete({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: message }],
      tools: tools,
      toolChoice: "auto",
    });

    const choice = response.choices?.[0];
    const toolCalls = choice?.message?.toolCalls;

    let result = {
      message: choice?.message?.content || "",
      toolCalls: toolCalls?.map((call: any) => ({
        name: call.function.name,
        arguments: JSON.parse(call.function.arguments),
      })),
    };

    // Simulate function execution
    if (toolCalls) {
      const functionResults = toolCalls.map((call: any) => {
        const args = JSON.parse(call.function.arguments);
        if (call.function.name === "get_weather") {
          return {
            name: call.function.name,
            result: `The weather in ${args.location} is sunny and 72°F`,
          };
        } else if (call.function.name === "calculate") {
          try {
            // Simple calculator - in production, use a proper math parser library
            // This is a mock implementation for demonstration
            return {
              name: call.function.name,
              result: `The calculation result for "${args.expression}" would be computed here. (Note: Using a safe math parser in production)`,
            };
          } catch {
            return {
              name: call.function.name,
              result: "Invalid expression",
            };
          }
        }
        return { name: call.function.name, result: "Unknown function" };
      });

      result = { ...result, functionResults } as any;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Function calling API error:", error);
    return NextResponse.json(
      { error: "Failed to process function calling" },
      { status: 500 }
    );
  }
}
