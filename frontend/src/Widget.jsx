export default function Widget({ data }) {
  if (!data) return null;

  return (
    <div className="widget-container">
      <div className="language">{data.lang}</div>

      <div className="word">
        {data.term?.text}
      </div>

      {data.term?.pronunciation && (
        <div className="pronunciation">
          {data.term.pronunciation}
        </div>
      )}

      <div className="definition">
        {data.definition}
      </div>
    </div>
  );
}
