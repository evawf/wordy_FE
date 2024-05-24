export default function Definition({ definition, audioLink, word }) {
  console.log("def: ", definition[0].title);
  return (
    <ul className="list">
      {definition.length === 0 && "No word to show"}
      {definition.map((d) => {
        return (
          <li key={definition.indexOf(d)}>
            <p>{d.title}</p>
          </li>
        );
      })}
    </ul>
  );
}
