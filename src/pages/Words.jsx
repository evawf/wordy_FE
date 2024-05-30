import { useState, useEffect } from "react";
import { WordCards } from "../components/WordCards";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import Loader from "../components/Loader";

export default function Words() {
  const [isDataLoading, setIsDataLoading] = useState(false);

  const url = import.meta.env.VITE_BACKEND_URL;
  const [words, setWords] = useState([]);

  useEffect(() => {
    setIsDataLoading(true);

    async function getRandomWords() {
      const getWords = await axios.get(`${url}/words`);
      setWords(getWords.data.words);
      setIsDataLoading(false);
    }
    getRandomWords();
  }, []);

  async function toggleWordState(id, is_mastered) {
    setWords((currentWordList) => {
      return currentWordList.map((word) => {
        if (word.id === id) {
          return { ...word, is_mastered };
        }
        return word;
      });
    });

    try {
      const updateWordStatus = await axios.put(`${url}/word/${id}/update`, {
        is_mastered: is_mastered,
      });
    } catch (err) {
      console.log("msg: ", err);
    }
  }

  async function deleteWord(id) {
    setWords((currentWordList) => {
      return currentWordList.filter((word) => word.id !== id);
    });

    try {
      const deleteWord = await axios.delete(`${url}/word/${id}/delete`);
    } catch (err) {
      console.log("msg: ", err);
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 sx={{}}>Today's Words</h1>
      {isDataLoading ? <Loader /> : <></>}
      <WordCards
        words={words}
        toggleWordState={toggleWordState}
        deleteWord={deleteWord}
      />
      <BottomNav />
    </Box>
  );
}
