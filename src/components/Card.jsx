import { defineWord } from "wordreference";
import { useState } from "react";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import { styled } from "@mui/joy/styles";
import DefinitionModal from "./DefinitionModal";

export function Card({ is_mastered, id, word, toggleWordState, deleteWord }) {
  const generateKey = () => {
    return crypto.randomUUID();
  };

  const [definition, setDefinition] = useState([]);
  const [audioLink, setAudioLink] = useState("");
  const [open, setOpen] = useState(false);

  async function showDefinition() {
    const getDefinition = await defineWord(word, "French-English");
    console.log(getDefinition);
    setDefinition(getDefinition.sections);
    setAudioLink(getDefinition.audioLinks[0]);
  }

  const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
    ...theme.typography["body-sm"],
    padding: theme.spacing(0),
    textAlign: "left",
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }));

  return (
    <li key={generateKey()}>
      <label>
        <input
          type="checkbox"
          checked={is_mastered}
          onChange={(e) => toggleWordState(id, e.target.checked)}
        />
        {word}
      </label>
      <Button
        size="sm"
        color="primary"
        onClick={() => {
          setOpen(true);
          showDefinition();
        }}
      >
        View
      </Button>

      {/********************** Modal **********************/}
      <DefinitionModal
        definition={definition}
        word={word}
        open={open}
        setOpen={setOpen}
      />

      <Button size="md" color="danger" onClick={() => deleteWord(id)}>
        Remove
      </Button>
    </li>
  );
}
