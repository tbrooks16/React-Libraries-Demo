import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), "app/db.json");
    const data = fs.readFileSync(dbPath, "utf8");
    const messages: { message: string; timestamp: string } = JSON.parse(data);
    console.log("Data fetched");
    return NextResponse.json(messages);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 },
    );
  }
}
