import { S3Client } from "@aws-sdk/client-s3";

const { S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY } = process.env;

// R2 Configuration
export const s3 = new S3Client({
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
  // Required for R2
  region: "auto",
  forcePathStyle: true,
});
