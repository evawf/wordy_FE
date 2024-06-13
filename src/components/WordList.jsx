import { WordCard } from "./WordCard";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

export function WordList({ wordList, toggleWordState, deleteWord }) {
  return (
    <List
      className="list"
      sx={{
        width: "100%",
        height: "550px",
        overflow: "auto",
        marginLeft: "25px",
      }}
    >
      {wordList.length === 0 && (
        <Button variant="text" fullWidth sx={{ marginLeft: "-12.5px" }}>
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
