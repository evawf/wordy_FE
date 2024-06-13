import { SingleWordCard } from "./SingleWordCard";
import List from "@mui/material/List";

export function WordCards({ words, toggleWordState, deleteWord }) {
  return (
    <List
      className="list"
      sx={{
        width: "98%",
        top: 15,
        overflow: "auto",
        marginBottom: "70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {words.length === 0 &&
        "You haven't added any word or something went wront."}
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
