const toneMap = {
  a: ["ā", "á", "ǎ", "à"],
  e: ["ē", "é", "ě", "è"],
  i: ["ī", "í", "ǐ", "ì"],
  o: ["ō", "ó", "ǒ", "ò"],
  u: ["ū", "ú", "ǔ", "ù"],
  ü: ["ǖ", "ǘ", "ǚ", "ǜ"],
};

function applyTone(syllable) {
  const match = syllable.match(/([a-zü]+)([1-4])/i);
  if (!match) return syllable;

  let [_, base, tone] = match;
  tone = parseInt(tone) - 1;

  const vowels = ["a", "e", "o", "i", "u", "ü"];
  let vowelIndex = -1;

  // Priority rule
  if (base.includes("a")) vowelIndex = base.indexOf("a");
  else if (base.includes("e")) vowelIndex = base.indexOf("e");
  else if (base.includes("ou")) vowelIndex = base.indexOf("o");
  else {
    for (let v of vowels) {
      if (base.includes(v)) {
        vowelIndex = base.indexOf(v);
        break;
      }
    }
  }

  if (vowelIndex === -1) return base;

  const vowel = base[vowelIndex];
  const toned = toneMap[vowel][tone];

  return (
    base.slice(0, vowelIndex) +
    toned +
    base.slice(vowelIndex + 1)
  );
}

function convertPinyin(text) {
  return text
    .split(" ")
    .map(applyTone)
    .join(" ");
}

module.exports = { convertPinyin };
