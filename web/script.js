const API_BASE = "https://vocab-widget.onrender.com";

async function loadRandomWord() {
  const res = await fetch(`${API_BASE}/words/random?language=zh`);
  const data = await res.json();

  document.getElementById("simplified").textContent = data.simplified || "";
  document.getElementById("pinyin").textContent = data.pinyin || "";
  document.getElementById("definition").textContent = data.definition || "";
}

async function searchWord() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  const res = await fetch(`${API_BASE}/words/search?q=${query}&language=zh`);
  const data = await res.json();

  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = "";

  data.results.forEach(word => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${word.simplified}</strong> (${word.pinyin}) - ${word.definition}
    `;
    resultsDiv.appendChild(div);
  });
}

loadRandomWord();
