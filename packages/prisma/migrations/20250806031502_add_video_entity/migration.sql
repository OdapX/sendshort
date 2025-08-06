-- CreateEnum
CREATE TYPE "public"."VideoStatus" AS ENUM ('ready', 'errored');

-- CreateTable
CREATE TABLE "public"."Video" (
    "id" TEXT NOT NULL,
    "status" "public"."VideoStatus",
    "inputProps" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
