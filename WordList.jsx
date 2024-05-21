import { WordCard } from "./WordCard";

export function WordList({ wordList, toggleWordState, deleteWord }) {
  return (
    <ul className="list">
      {wordList.length === 0 && "No word to show"}
      {wordList.map((word) => {
        return (
          <WordCard
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
