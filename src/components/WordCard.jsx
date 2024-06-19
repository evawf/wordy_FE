import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditWordModal from "./EditWordModal";
import { useState } from "react";
import Box from "@mui/material/Box";

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={is_mastered}
            onChange={(e) => toggleWordState(id, e.target.checked)}
          />
        </label>
        <Box
          style={{ width: "100%", overflow: "auto" }}
          color={is_mastered ? "green" : "none"}
        >
          {word}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              setOpenEdit(true);
            }}
          >
            <EditNoteIcon color="secondary" />
          </Button>
          <Button
            size="small"
            color="error"
            variant="text"
            sx={{
              alignContent: "right",
              margin: 0,
              padding: 0,
              minWidth: "24px",
            }}
            onClick={() => deleteWord(id)}
          >
            <DeleteForeverIcon sx={{ margin: 0, padding: 0 }} />
          </Button>
        </Box>
      </li>
    </>
  );
}
