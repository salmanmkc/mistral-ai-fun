import { Mistral } from "@mistralai/mistralai";
import { NextRequest } from "next/server";

export const runtime = "edge";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { messages, model = "mistral-tiny" } = await req.json();

    // Check if any message has images to determine if we need vision model
    const hasImages = messages.some((msg: any) =>
      msg.files?.some((file: any) => file.type.startsWith('image/'))
    );

    // Use vision model if images are present
    const selectedModel = hasImages ? "pixtral-12b-2409" : model;

    // Process messages to support multimodal content
    const processedMessages = messages.map((msg: any) => {
      if (msg.files && msg.files.length > 0) {
        const hasImageFiles = msg.files.some((file: any) => file.type.startsWith('image/'));

        if (hasImageFiles) {
          // Use multimodal content format for images
          const content: any[] = [];

          // Add text if present
          if (msg.content && msg.content.trim()) {
            content.push({
              type: "text",
              text: msg.content
            });
          }

          // Add images and text files
          msg.files.forEach((file: any) => {
            if (file.type.startsWith('image/')) {
              // Log image data for debugging
              console.log(`Processing image: ${file.name}`);
              console.log(`Image type: ${file.type}`);
              console.log(`Image data length: ${file.content?.length}`);
              console.log(`Image data prefix: ${file.content?.substring(0, 50)}`);

              // Mistral TypeScript SDK uses camelCase: imageUrl (not image_url!)
              // Format: "data:image/jpeg;base64,{base64_string}"
              content.push({
                type: "image_url",
                imageUrl: file.content  // camelCase!
              });
            } else {
              // For text files, add as text content
              let textContent = file.content || '';
              if (textContent.length > 5000) {
                textContent = textContent.substring(0, 5000) + '\n... (truncated)';
              }
              content.push({
                type: "text",
                text: `\n[Attached file: ${file.name}]\n${textContent}`
              });
            }
          });

          return {
            role: msg.role,
            content: content
          };
        } else {
          // Text files only - use simple string format
          const fileInfo = msg.files
            .map((file: any) => {
              let content = file.content || '';
              if (content.length > 5000) {
                content = content.substring(0, 5000) + '\n... (truncated)';
              }
              return `\n[Attached file: ${file.name}]\n${content}`;
            })
            .join('\n');
          return {
            role: msg.role,
            content: msg.content + fileInfo,
          };
        }
      }
      return {
        role: msg.role,
        content: msg.content,
      };
    });

    // Log the request for debugging
    console.log(`Using model: ${selectedModel}`);
    console.log(`Messages count: ${processedMessages.length}`);
    console.log('Full request:', JSON.stringify({
      model: selectedModel,
      messages: processedMessages.map((msg: any) => ({
        role: msg.role,
        contentType: typeof msg.content,
        contentIsArray: Array.isArray(msg.content),
        contentLength: Array.isArray(msg.content) ? msg.content.length : msg.content?.length
      }))
    }, null, 2));

    const chatStream = await mistral.chat.stream({
      model: selectedModel,
      messages: processedMessages,
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
  } catch (error: any) {
    console.error("Chat API error:", error);
    const errorMessage = error?.message || "Failed to process chat request";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
