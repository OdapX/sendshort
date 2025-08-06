import { prisma } from "@sendshorts/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  videoId: z.string(),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsed = schema.parse(data);

  const video = await prisma.video.findUnique({
    where: {
      id: parsed.videoId,
    },
  });

  return NextResponse.json({
    video: {
      status: video?.status,
      progress: video?.progress,
      videoUrl: video?.videoUrl,
    },
  });
}
