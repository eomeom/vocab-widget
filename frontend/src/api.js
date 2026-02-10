export async function getWord(lang = "en") {
  const url = `${import.meta.env.VITE_API_BASE}/vocab?lang=${lang.toLowerCase()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch word");
  }

  const data = await res.json();
  return data;
}