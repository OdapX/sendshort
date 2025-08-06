"use server";
import { s3, PutObjectCommand } from "@sendshorts/shared/S3";
import { INPUT_PROPS, inputPropsSchema } from "../dtos";
import { prisma } from "@sendshorts/prisma/client";
import cuid from "cuid";

export async function enqueueRender({
  videoId,
  inputProps,
}: {
  videoId: string;
  inputProps: INPUT_PROPS;
}) {
  const parsedInputProps = inputPropsSchema.parse(inputProps);

  const videoKey = cuid();
  const arrayBuff = await parsedInputProps.footage.file.arrayBuffer();

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: videoKey,
      Body: Buffer.from(arrayBuff),
      ContentType: "video/mp4",
    })
  );

  const footageUrl = `${process.env.NEXT_PUBLIC_R2_BUCKET_BASE_URL}/${videoKey}`;

  const renderInputProps = {
    ...inputProps,
    footage: {
      ...inputProps.footage,
      footageUrl,
      file: undefined,
    },
  };

  await prisma.video.upsert({
    where: { id: videoId },
    update: {
      inputProps: renderInputProps,
      status: "processing",
      progress: 0,
      videoUrl: undefined,
    },
    create: {
      id: videoId,
      inputProps: renderInputProps,
      status: "processing",
      progress: 0,
    },
  });

  const renderPayload = {
    videoId,
    inputProps: renderInputProps,
  };

  await fetch(`${process.env.RENDER_SERVER_URL!}/enqueue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(renderPayload),
  });
}
