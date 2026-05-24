import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { Users } from "../../../config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { user } = await req.json();

  const email = user?.email;

  try {
    if (!email) {
      return NextResponse.json({ error: "email is null" });
    }

    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    if (userInfo.length === 0) {
      const SaveResult = await db.insert(Users).values({
        name: user.fullName,
        email,
        image_url: user.imageUrl, // 🔥 여기 중요 (snake_case!)
        credits: 0,
      }).returning();

      return NextResponse.json({ result: SaveResult[0] });
    }

    return NextResponse.json({ result: userInfo[0] });

  } catch (e) {
    return NextResponse.json({ error: String(e) });
  }
}