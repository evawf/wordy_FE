import { defineWord } from "wordreference";
import { useState } from "react";
import Button from "@mui/joy/Button";
import DefinitionModal from "./DefinitionModal";
import EditWordModal from "./EditWordModal";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";

import axios from "axios";

export function SingleWordCard({
  is_mastered,
  id,
  word,
  toggleWordState,
  deleteWord,
}) {
  const label = { inputProps: { "aria-label": "Checkbox heart" } };
  const url = import.meta.env.VITE_BACKEND_URL;

  const generateKey = () => {
    return crypto.randomUUID();
  };

  const [definition, setDefinition] = useState([]);
  const [audioLink, setAudioLink] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  async function showDefinition() {
    // Get definition from DB
    const { data } = await axios.get(`${url}/${word}/definition`);
    if (data.msg !== "failed") {
      setAudioLink(data.audio);
      setDefinition(data.definition);
    } else {
      // Get definition from wordreference
      const getDefinition = await defineWord(word, "French-English");
      setDefinition(getDefinition.sections);
      setAudioLink(getDefinition.audioLinks[0]);
      const audio = getDefinition.audioLinks[0];
      const definition = getDefinition.sections;

      // update DB
      const addNewWord = await axios.put(`${url}/definition/update`, {
        audio: audio,
        definition: definition,
        word: word,
      });
    }
  }

  return (
    <Card
      key={generateKey()}
      sx={{
        height: "130px",
        width: "auto",
        borderRadius: "10px",
        m: 0,
        p: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/********************** Definition Modal **********************/}
      <DefinitionModal
        word={word}
        open={open}
        setOpen={setOpen}
        audioLink={audioLink}
        definition={definition}
      />

      {/********************** Edit Word Modal **********************/}
      <EditWordModal
        id={id}
        word={word}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          color={is_mastered ? "green" : "none"}
          sx={{
            width: "100%",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          <strong>{word}</strong>
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#d9d8d4",
          height: "40px",
        }}
      >
        <Button
          size="sm"
          color="danger"
          variant="text"
          sx={{ width: "100px" }}
          onClick={() => deleteWord(id)}
        >
          <DeleteIcon color="error" />
        </Button>
        <Checkbox
          type="checkbox"
          // icon={<FavoriteBorder />}
          // checkedIcon={<Favorite />}
          {...label}
          checked={is_mastered}
          onChange={(e) => toggleWordState(id, e.target.checked)}
        />
        <Button
          size="sm"
          variant="text"
          sx={{ width: "100px" }}
          onClick={() => {
            setOpen(true);
            showDefinition();
          }}
        >
          <VisibilityIcon color="primary" />
        </Button>

        {/* <Button
          size="sm"
          variant="text"
          sx={{ width: "100px" }}
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          <EditNoteIcon color="secondary" />
        </Button> */}
      </CardActions>
    </Card>
  );
}
