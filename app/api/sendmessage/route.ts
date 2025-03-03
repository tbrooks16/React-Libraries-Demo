import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sleep } from "@/lib/utils";

const responses = new Map([
  ["Hello", "Hello! My name is Chatbot, and I'm here to assist you today."],
  [
    "How are you?",
    "I'm your friendly AI assistant, ready to help with any questions you might have.",
  ],
  [
    "What is your name?",
    "Greetings! I'm Chatbot, and I'm excited to help you with your request.",
  ],
  [
    "What is your purpose?",
    "Welcome! I'm an AI assistant capable of helping you with various tasks.",
  ],
  [
    "What can you do for me?",
    "Hi there! I'm your virtual assistant, and I'm ready to provide support.",
  ],
]);

export async function POST(request: Request) {
  try {
    const {
      message,
      i,
    }: { message: string | undefined; i: number | undefined } =
      await request.json();
    console.log(message, i);
    if (!message || i === undefined) {
      return NextResponse.json(
        { error: "Message and index is required" },
        { status: 400 }
      );
    }
    // sleep for 3 seconds
    // await sleep(3000);
    const AIresponse =
      responses.get(message) ?? "I'm not sure how to respond to that.";
    writeToDb(message, AIresponse);

    return await streamResponse(AIresponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}

const streamResponse = async (response: string) => {
  const words = response.split(" ");

  // Create a TransformStream for streaming
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // Start streaming response
  writeToStream(writer, words, encoder); // Don't await to allow streaming

  // Return the streaming response
  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
};

const writeToStream = async (
  writer: WritableStreamDefaultWriter<Uint8Array>,
  response: string[],
  encoder: TextEncoder,
  delay: number = 200
) => {
  try {
    for (const word of response) {
      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, delay));
      // Write each word followed by a space
      await writer.write(encoder.encode(word + " "));
    }
    await writer.close();
  } catch (error) {
    await writer.abort(error);
  }
};

const writeToDb = (message: string, AIresponse: string) => {
  const dbPath = path.join(process.cwd(), "app/db.json");
  // Read existing data or create new array
  let messages = [];
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    messages = JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid, start with empty array
    console.log(error);
  }
  // Append new message
  messages.push({ message, timestamp: new Date().toLocaleDateString() });
  messages.push({
    message: AIresponse,
    timestamp: new Date().toLocaleTimeString(),
  });
  // Write back to file
  fs.writeFileSync(dbPath, JSON.stringify(messages, null, 2));
};
