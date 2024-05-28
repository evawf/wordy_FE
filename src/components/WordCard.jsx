import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export function WordCard({
  is_mastered,
  id,
  word,
  toggleWordState,
  deleteWord,
}) {
  return (
    <li
      key={id}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/* <label htmlFor="wordState"> */}
      <label
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: "20px",
        }}
      >
        <input
          // id="wordState"
          type="checkbox"
          checked={is_mastered}
          onChange={(e) => toggleWordState(id, e.target.checked)}
        />
        <p style={{ width: "100px" }}>{word}</p>
      </label>
      <Button
        size="small"
        color="error"
        variant="text"
        onClick={() => deleteWord(id)}
      >
        <DeleteForeverIcon />
      </Button>
    </li>
  );
}
