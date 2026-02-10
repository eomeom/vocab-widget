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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get lang from URL
  const lang = getLangFromURL();

  // Fetch function
  const fetchWord = () => {
    setLoading(true);
    setError(null);

    getWord(lang)
      .then((wordData) => setData(wordData))
      .catch(() => setError("Unable to load word"))
      .finally(() => setLoading(false));
  };

    // How it works
    // 1. Initial fetch: loads the current word when the component mounts.
    // 2. First timeout: calculates how many milliseconds are left until the next hour, so the refresh aligns with your backend hourly rotation.
    // 3. Subsequent intervals: after the first refresh, the word updates every hour exactly.
    // 4. Cleanup: ensures no memory leaks if the component unmounts.


    useEffect(() => {
      
      fetchWord();

    // --- Hourly refresh ---
    // Calculate ms until next hour
    const now = new Date();
    const msToNextHour =
      (60 - now.getMinutes()) * 60 * 1000 -
      now.getSeconds() * 1000 -
      now.getMilliseconds();

    const timeout = setTimeout(() => {
      fetchWord();

      // After first trigger, refresh every hour
      const interval = setInterval(fetchWord, 60 * 60 * 1000);
    
      // Cleanup interval on unmount
      return () => clearInterval(interval);
    }, msToNextHour);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);

  }, [lang]);

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

  if (loading) {
    return <div className="widget-container">Loading word…</div>;
  }
  if (error) {
    return <div className="widget-container error">{error}</div>;
  }

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
