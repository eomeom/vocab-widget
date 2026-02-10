import { useEffect, useState } from "react";
import Widget from "./Widget";
import { getWord } from "./api";

function getLangFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") || "en";
}

export default function App() {
  const lang = getLangFromURL();

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setData(null);
    setError(false);

    getWord(lang)
      .then(setData)
      .catch(() => setError(true));
  }, [lang]);

  if (error) {
    return (
      <Widget data={data} />
    );
  }

  if (!data) {
    return (
      <Widget data={data} />
    );
  }

  return (
    <Widget data={data} />
  );
}


// // testing stub version
// import Widget from "./Widget";

// function getLangFromURL() {
//   const params = new URLSearchParams(window.location.search);
//   return params.get("lang") || "en";
// }

// export default function App() {
//   const lang = getLangFromURL();

//   // Temporary stub data (we remove this later)
//   const data = {
//     language: lang.toUpperCase(),
//     word: "loading",
//     pronunciation: "",
//     definition: "loading"
//   };

//   return <Widget {...data} />;
// }
