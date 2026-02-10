export async function getWord(lang) {
  const base = import.meta.env.VITE_API_BASE;

  const res = await fetch(`${base}/vocab?lang=${lang}`, {
    cache: "force-cache"
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
