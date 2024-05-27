import { SingleWordCard } from "./SingleWordCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export function WordCards({ words, toggleWordState, deleteWord }) {
  return (
    <List className="list">
      {words.length === 0 && "No word to show"}
      {words.map((word) => {
        return (
          <SingleWordCard
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
