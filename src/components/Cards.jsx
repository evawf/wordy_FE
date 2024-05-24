import { Card } from "./Card";

export function Cards({ words, toggleWordState, deleteWord }) {
  return (
    <ul className="list">
      {words.length === 0 && "No word to show"}
      {words.map((word) => {
        return (
          <Card
            {...word}
            key={word.id}
            toggleWordState={toggleWordState}
            deleteWord={deleteWord}
          />
        );
      })}
    </ul>
  );
}
