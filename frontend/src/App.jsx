import { useEffect, useState } from "react";
import Widget from "./Widget";
import { getWord } from "./api";


// Helper to get lang param from URL
function getLangFromURL() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("lang") || "en").toLowerCase() || "en";
}

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get lang from URL
  const lang = getLangFromURL();

  useEffect(() => {
    setLoading(true);
    setError(false);
    //setData(null);

    getWord(lang)
      .then((wordData) => {
        setData(wordData);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    // // Fetch word data from API
    // fetch(`${import.meta.env.VITE_API_BASE}/vocab?lang=${lang}`)
    //   .then(res => {
    //     if (!res.ok) throw new Error("API error");
    //     return res.json();
    //   })
    //   .then(json => setData(json))
    //   .catch(() => setError(true))
    //   //.catch(() => setError("Unable to load word"))
    //   .finally(() => setLoading(false));

  }, [lang]);

  if (loading) return <div className="widget-container">Loading word…</div>;

  if (error)
    return <div className="widget-container error">Unable to load word.</div>;

  return <Widget data={data} />;
}


// // Revised version using api.js

// import { useEffect, useState } from "react";
// import Widget from "./Widget";
// import { getWord } from "./api";

// function getLangFromURL() {
  // const params = new URLSearchParams(window.location.search);
//   return params.get("lang") || "en";
// }

// export default function App() {
//   const lang = getLangFromURL();

//   const [data, setData] = useState(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     setData(null);
//     setError(false);

//     getWord(lang)
//       .then(setData)
//       .catch(() => setError(true));
//   }, [lang]);

//   if (error) {
//     return (
//       <Widget data={data} />
//     );
//   }

//   if (!data) {
//     return (
//       <Widget data={data} />
//     );
//   }

//   return (
//     <Widget data={data} />
//   );
// }


// // // testing stub version
// // import Widget from "./Widget";

// // function getLangFromURL() {
// //   const params = new URLSearchParams(window.location.search);
// //   return params.get("lang") || "en";
// // }

// // export default function App() {
// //   const lang = getLangFromURL();

// //   // Temporary stub data (we remove this later)
// //   const data = {
// //     language: lang.toUpperCase(),
// //     word: "loading",
// //     pronunciation: "",
// //     definition: "loading"
// //   };

// //   return <Widget {...data} />;
// // }
