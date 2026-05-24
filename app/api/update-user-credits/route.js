import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { Users } from "../../../config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { credits, email } = await req.json();

    const result = await db
      .update(Users)
      .set({
        credits: credits,
      })
      .where(eq(Users.email, email))
      .returning();

    return NextResponse.json({ result });

  } catch (e) {
    return NextResponse.json({ error: e.toString() });
  }
}