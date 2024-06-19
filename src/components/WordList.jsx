import { WordCard } from "./WordCard";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

export function WordList({ wordList, toggleWordState, deleteWord }) {
  return (
    <List
      className="list"
      sx={{
        width: "80%",
      }}
    >
      {wordList.length === 0 && (
        <Button variant="text" fullWidth>
          You haven't added any word yet.
        </Button>
      )}
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
