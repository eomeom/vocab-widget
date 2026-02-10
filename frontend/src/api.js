export async function getWord(lang = "en") {
  try {
    const base = import.meta.env.VITE_API_BASE;
    const res = await fetch(`${base}/vocab?lang=${lang}`, {
    cache: "force-cache"
  });
  
    if (!res.ok) throw new Error("API request failed");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch word:", err);
    throw err;
  }
}
