import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export function NewWordForm({ onSubmit }) {
  const [newWord, setNewWord] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newWord === "") return alert("You haven't entered a word yet!");
    console.log(newWord);
    onSubmit(newWord);
    setNewWord("");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        my: 2,
      }}
    >
      {/* <Box>+ New word</Box> */}
      <form
        onSubmit={handleSubmit}
        className="new-word-form"
        sx={{ width: "100%" }}
      >
        <Box
          className="form-row"
          sx={{ my: 1, display: "flex", flexDirection: "row", width: "100%" }}
        >
          <Input
            type="text"
            name="word"
            id="word"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            sx={{ height: "40px", borderRadius: "10px 0 0 10px" }}
          />
          <button className="btn addNewWordBtn" variant="outlined">
            <AddCircleOutlineIcon />
          </button>
        </Box>
      </form>
    </Box>
  );
}
