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
import uuid from "node-uuid";

export default function DefinitionModal({
  word,
  definition,
  open,
  setOpen,
  audioLink,
}) {
  var generateKey = () => {
    return crypto.randomUUID();
  };

  const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.background.level1 : "none",
    ...theme.typography["body-sm"],
    padding: theme.spacing(0),
    textAlign: "left",
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }));

  return (
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

        {definition.map((d) => {
          return (
            <List id="modal-desc" key={uuid()}>
              <ListItem color="primary" sx={{ padding: 0 }}>
                {d.title}
              </ListItem>
              <Divider></Divider>
              <Grid container sx={{ flexGrow: 0, overflow: "auto" }}>
                <Grid>
                  <Item>
                    {d.translations.map((w) => {
                      return (
                        <Item key={generateKey()}>
                          <Item sx={{ pt: 1, pb: 0 }}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: 6 }}
                            ></FiberManualRecordIcon>{" "}
                            {}
                            <strong>{w.word.word}</strong> {w.word.pos}. {"("}
                            {w.definition}
                            {")"}
                          </Item>

                          <Item sx={{ pt: 0, pb: 2 }}>
                            {w.examples.map((e) => {
                              return (
                                <Item key={generateKey()}>- {e.phrase}</Item>
                              );
                            })}
                          </Item>
                        </Item>
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
            </List>
          );
        })}
      </Sheet>
    </Modal>
  );
}
