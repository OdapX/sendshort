import { prisma } from "@sendshorts/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const renderSchema = z.object({
  videoId: z.string(),
  videoUrl: z.string(),
  status: z.enum(["errored", "ready"]),
  computeTime: z.number(),
});

// TODO: Add security layer through bearer (only remotion renderer is allowed)
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsed = renderSchema.parse(data);

  // logger
  console.warn("rendered video in", parsed.computeTime);

  await prisma.video.update({
    where: {
      id: parsed.videoId,
    },
    data: {
      videoUrl: parsed.videoUrl,
      status: parsed.status,
    },
  });

  return NextResponse.json({ success: true });
}
