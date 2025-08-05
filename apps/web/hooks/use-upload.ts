// "use client";
// import { useState } from "react";
// import { uploadFileToMux } from "../actions/mux-upload";
// import { toast } from "@sendshorts/ui/sonner";

// const DEFAULT_MAX_SIZE = 500; // Mb

// export function useUpload({
//   maxSize = DEFAULT_MAX_SIZE,
// }: {
//   maxSize?: number;
// }) {
//   const [isLoading, setLoading] = useState<boolean>(false);

//   const uploadFile = async ({ file }: { file: File }) => {
//     if (file.size > maxSize * 1024 * 1024) {
//       toast.error(`File size exceeds ${maxSize} MB.`);
//     }
//     setLoading(true);

//     try {
//       const { videoUrl, audioUrl } = await uploadFileToMux(file);
//       setLoading(false);
//       return { videoUrl, audioUrl };
//     } catch {
//       toast.error("Failed to upload file. Please try again.");
//     }
//   };

//   return {
//     uploadFile,
//     isLoading,
//   };
// }
