"use server";

export async function generateCaptions(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.API_URL!}/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  const { segments, words } = await res.json();

  return { segments, words };
}
