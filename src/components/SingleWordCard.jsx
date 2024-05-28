import { defineWord } from "wordreference";
import { useState } from "react";
import Button from "@mui/joy/Button";
import DefinitionModal from "./DefinitionModal";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";

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

  async function showDefinition() {
    //test
    const getDefinition = await defineWord(word, "French-English");
    console.log(
      "word reference: ",
      getDefinition,
      "\n",
      "definition sections: ",
      getDefinition.sections
    );

    // Get definition from DB
    const { data } = await axios.get(`${url}/${word}/definition`);
    if (data.msg !== "failed") {
      setAudioLink(data.audio);
      setDefinition(data.definition);
    } else {
      // Get definition from wordreference
      const getDefinition = await defineWord(word, "French-English");
      console.log("word reference: ", getDefinition);
      setDefinition(getDefinition.sections);
      setAudioLink(getDefinition.audioLinks[0]);
      const audio = getDefinition.audioLinks[0];
      const definition = getDefinition.sections;
      console.log("def to db: ", definition);

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
        m: 0,
        p: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/********************** Modal **********************/}
      <DefinitionModal
        definition={definition}
        word={word}
        open={open}
        setOpen={setOpen}
        audioLink={audioLink}
      />
      {/* <CardActionArea> */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h5" component="div" sx={{ width: "100px" }}>
          {word}
        </Typography>
        <Checkbox
          // type="checkbox"
          sx={{ pt: 0.6 }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          {...label}
          checked={is_mastered}
          onChange={(e) => toggleWordState(id, e.target.checked)}
        />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "lightBlue",
          height: "40px",
        }}
      >
        <Button
          size="sm"
          variant="text"
          onClick={() => {
            setOpen(true);
            showDefinition();
          }}
          sx={{ width: "100px" }}
        >
          <VisibilityIcon color="primary" />
        </Button>
        <Button
          size="sm"
          color="danger"
          onClick={() => deleteWord(id)}
          variant="text"
          sx={{ width: "100px" }}
        >
          <DeleteIcon color="error" />
        </Button>
      </CardActions>
      {/* </CardActionArea> */}
    </Card>
  );
}
