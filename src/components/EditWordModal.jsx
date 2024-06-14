import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import axios from "axios";

export default function EditWordModal({ id, word, openEdit, setOpenEdit }) {
  const [udpatedWord, setUpdatedWord] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;

  console.log(id, word);

  function handleChange(e) {
    setUpdatedWord(e.target.value);
  }

  async function handleEditWord() {
    try {
      const updateWord = await axios.put(`${url}/word/${id}/edit`, {
        word: udpatedWord,
      });
      // alert("word updated!");
    } catch (err) {
      console.log("msg: ", err);
    }
  }
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openEdit}
      onClose={() => setOpenEdit(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 350,
          maxHeight: 700,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          overflow: "auto",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          textAlign={"center"}
          mb={1}
        >
          Edit Word
        </Typography>
        <form
          onSubmit={handleEditWord}
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
              value={udpatedWord ? udpatedWord : word}
              onChange={handleChange}
              sx={{ height: "40px", borderRadius: "10px 0 0 10px" }}
            />
            <button className="btn addNewWordBtn" variant="outlined">
              <ArrowCircleUpIcon size="sm" />
            </button>
          </Box>
        </form>
      </Sheet>
    </Modal>
  );
}
