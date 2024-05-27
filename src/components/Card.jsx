// var wr = require("wordreference-api");
import { defineWord } from "wordreference";
import { useState, useEffect } from "react";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

import { styled } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { AudioPlayer } from "react-audio-play";

export function Card({ is_mastered, id, word, toggleWordState, deleteWord }) {
  const generateKey = () => {
    return crypto.randomUUID();
  };

  const [definition, setDefinition] = useState([]);
  const [audioLink, setAudioLink] = useState("");
  const [open, setOpen] = useState(false);

  async function showDefinition() {
    const definition = await defineWord(word, "French-English");
    setDefinition(definition.sections);
    setAudioLink(definition.audioLinks[0]);
  }

  console.log(definition, audioLink);

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
      {/* <label htmlFor="wordState"> */}
      <label>
        <input
          // id="wordState"
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
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
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
            maxWidth: 500,
            maxHeight: 1000,
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
            mb={1}
          >
            {word}
          </Typography>
          {audioLink && (
            <AudioPlayer
              src={audioLink}
              color="black"
              sliderColor="#ff669d"
              style={{
                background: "none",
                borderRadius: "15px",
                padding: "30px",
              }}
            />
          )}

          <List id="modal-desc">
            {definition.map((d) => {
              return (
                <>
                  <ListItem
                    key={generateKey()}
                    color="primary"
                    sx={{ padding: 0 }}
                  >
                    {d.title}
                  </ListItem>
                  <Divider></Divider>
                  <Grid container sx={{ flexGrow: 0, overflow: "auto" }}>
                    <Grid>
                      <Item>
                        {d.translations.map((w) => {
                          return (
                            <>
                              <Item key={generateKey()} sx={{ pt: 1, pb: 0 }}>
                                <FiberManualRecordIcon
                                  sx={{ fontSize: 6 }}
                                ></FiberManualRecordIcon>{" "}
                                {}
                                <strong>{w.word.word}</strong> {w.word.pos}.{" "}
                                {"("}
                                {w.definition}
                                {")"}
                              </Item>

                              <Item sx={{ pt: 0, pb: 2 }}>
                                {w.examples.map((e) => {
                                  return (
                                    <Item key={generateKey()}>
                                      - {e.phrase}
                                    </Item>
                                  );
                                })}
                              </Item>
                            </>
                          );
                        })}
                      </Item>
                    </Grid>
                    {/* <Grid xs={6}>
                      <Item>xs=6</Item>
                    </Grid>
                    <Grid xs>
                      <Item>xs</Item>
                    </Grid> */}
                  </Grid>
                </>
              );
            })}
          </List>
        </Sheet>
      </Modal>

      {/********************** Modal **********************/}

      <Button size="md" color="danger" onClick={() => deleteWord(id)}>
        Remove
      </Button>
    </li>
  );
}
