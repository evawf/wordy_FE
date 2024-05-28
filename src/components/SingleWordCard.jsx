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
    // Get definition from wordreference
    // const getDefinition = await defineWord(word, "French-English");
    // console.log(getDefinition);
    // setDefinition(getDefinition.sections);
    // setAudioLink(getDefinition.audioLinks[0]);

    // Get definition from DB
    console.log("word: ", word);
    const { data } = await axios.get(`${url}/${word}/definition`);
    console.log("data: ", data, "def: ", data.definition);
    setAudioLink(data.audio);
    setDefinition(data.definition);
  }

  return (
    <Card
      key={generateKey()}
      sx={{ height: "130px", width: "auto", m: 0, p: 0 }}
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
        }}
      >
        {/* <Stack direction="row" spacing={4}> */}
        <Button
          size="sm"
          color="primary"
          variant="outlined"
          onClick={() => {
            setOpen(true);
            showDefinition();
          }}
          sx={{ width: "100px" }}
        >
          <VisibilityIcon />
          {}
          View
        </Button>
        <Button
          size="sm"
          color="danger"
          onClick={() => deleteWord(id)}
          variant="outlined"
          sx={{ width: "100px" }}
        >
          <DeleteIcon />
          {}
          Remove
        </Button>
        {/* </Stack> */}
      </CardActions>
      {/* </CardActionArea> */}
    </Card>
  );
}
