"use server";
import { mux } from "@sendshorts/shared/mux";

// upload to mux with audio and video channels.
export async function uploadFileToMux(file: File) {
  const directUpload = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policy: ["public"],
      video_quality: "basic",
      static_renditions: [
        {
          resolution: "highest",
        },
        {
          resolution: "audio-only",
        },
      ],
    },
    cors_origin: "*",
  });

  const response = await fetch(directUpload.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to upload file to Mux");
  }

  const upload = await mux.video.uploads.retrieve(directUpload.id);
  const assetId = upload.asset_id;

  const endStatuses = ["ready", "errored"];
  let asset;

  // wait for the asset to be processed
  do {
    asset = await mux.video.assets.retrieve(assetId!);
    if (!endStatuses.includes(asset.status)) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } while (!endStatuses.includes(asset.status));

  if (asset.status == "errored") {
    throw new Error("Mux failed to prepare the asset.");
  }

  return {
    playbackId: asset.playback_ids?.[0]?.id,
  };
}
