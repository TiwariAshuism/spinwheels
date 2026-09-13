import { NextResponse } from "next/server";
import { waitlistSchema } from "@spinwheels/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, data: parsed.data });
}
