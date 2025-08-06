import { prisma } from "@sendshorts/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const progressSchema = z.object({
  videoId: z.string(),
  progress: z.number(),
});

// TODO: Add security layer through bearer (only remotion renderer is allowed)
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsed = progressSchema.parse(data);

  const updated = await prisma.video.update({
    where: {
      id: parsed.videoId,
    },
    data: {
      status: "processing",
      progress: Number(parsed.progress.toFixed(3)),
    },
  });

  return NextResponse.json({ success: true });
}
