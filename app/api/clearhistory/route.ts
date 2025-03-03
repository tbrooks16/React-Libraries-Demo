import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const dbPath = path.join(process.cwd(), "app/db.json");
    fs.writeFileSync(dbPath, JSON.stringify([]));
    return NextResponse.json({ message: "History cleared" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to clear history" },
      { status: 500 }
    );
  }
}
