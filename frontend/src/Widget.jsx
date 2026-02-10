export default function Widget({ data }) {
  if (!data) return null;

    const { lang, term, definition } = data;

  return (
    <div className="widget-container">
      <div className="language">{lang.toUpperCase()}</div>

      <div className="word">
        {data.term?.text || "-"}
      </div>

      {data.term?.pronunciation && (
        <div className="pronunciation">
          {term.pronunciation}
        </div>
      )}

      <div className="definition">
        {definition}
      </div>
    </div>
  );
}
