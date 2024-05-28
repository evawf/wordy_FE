import { WordCard } from "./WordCard";
import List from "@mui/material/List";

export function WordList({ wordList, toggleWordState, deleteWord }) {
  return (
    <List className="list" sx={{ width: "100%", overflow: "auto" }}>
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
    </List>
  );
}
