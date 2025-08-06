const loadedFonts: Record<string, boolean> = {};

export const loadGoogleFont = async (
  family: string,
  weights: string[] = ["400"],
): Promise<void> => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("'loadGoogleFont' is meant for the client side.");
  }

  if (loadedFonts[family]) return;

  loadedFonts[family] = true;

  try {
    const formattedFamily = family.replace(/ /g, "+");
    const weightsParam = weights.length > 0 ? `:wght@${weights.join(";")}` : "";
    const href = `https://fonts.googleapis.com/css2?family=${formattedFamily}${weightsParam}&display=swap`;

    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.href = href;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Wait for the font to be available via `document.fonts.ready`
    await document.fonts.ready;
    console.log("font loadedd");
  } catch (e) {
    console.log("font issue", e);
  } finally {
  }
};
