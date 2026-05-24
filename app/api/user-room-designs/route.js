import { NextResponse } from "next/server";

import { db } from "../../../config/db";

import { AiGeneratedImage } from "../../../config/schema";

import { eq } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  const result = await db
    .select()
    .from(AiGeneratedImage)
    .where(eq(AiGeneratedImage.userEmail, email));

  return NextResponse.json({ result: result });
}