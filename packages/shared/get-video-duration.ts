export function getVideoDuration(file: File): Promise<number> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(
      new Error("getVideoDuration can only be used on the client side.")
    );
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");

    video.preload = "metadata";
    video.src = url;

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(video.duration);
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load video metadata."));
    };
  });
}
