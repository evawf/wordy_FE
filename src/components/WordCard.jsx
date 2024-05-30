import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditWordModal from "./EditWordModal";
import { useState } from "react";

export function WordCard({
  is_mastered,
  id,
  word,
  toggleWordState,
  deleteWord,
}) {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      {/********************** Edit Word Modal **********************/}
      <EditWordModal
        id={id}
        word={word}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />

      <li
        key={id}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <label htmlFor="wordState"> */}
        <label
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
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
          size="sm"
          variant="text"
          sx={{ width: "100px", paddingLeft: "15px" }}
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          <EditNoteIcon color="secondary" />
        </Button>
        {/* <Button
        size="small"
        color="error"
        variant="text"
        onClick={() => deleteWord(id)}
      >
        <DeleteForeverIcon />
      </Button> */}
      </li>
    </>
  );
}
