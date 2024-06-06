import { useState, useEffect, useContext } from "react";
import { NewWordForm } from "../components/NewWordForm";
import { WordList } from "../components/WordList";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import { defineWord } from "wordreference";
import Divider from "@mui/material/Divider";
import Loader from "../components/Loader";
import useGlobalUserContext from "../globalContext/UserContext";
import { useNavigate } from "react-router-dom";

export default function New() {
  // const [wordList, setWordList] = useState(() => {
  //   const localValue = localStorage.getItem("WORDS");
  //   if (localValue === null) return [];
  //   return JSON.parse(localValue);
  // });
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [wordList, setWordList] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      async function getWordsData() {
        try {
          const { data } = await axios.get(`${url}/allwords`, {});
          const words = data.words;
          if (words.length) {
            // localStorage.setItem("WORDS", JSON.stringify(words));
            setWordList(words);
          }
        } catch (err) {
          console.log("msg: ", err);
        }
      }

      getWordsData();
    }
  }, []);

  async function addWord(newWord) {
    try {
      // API Call wordreference to get autolink and definition
      setIsDataLoading(true);

      const getDefinition = await defineWord(newWord, "French-English");
      const audio = getDefinition.audioLinks[0];
      const definition = getDefinition.sections;

      const addNewWord = await axios.post(`${url}/new`, {
        newWord: newWord.trim(),
        audio: audio,
        definition: definition,
      });

      const data = addNewWord.data;
      if (data.newWordAdded) {
        const newWord = { id: data.id, word: data.newWord, is_mastered: false };

        setWordList((currentWordList) => {
          // return [...currentWordList, newWord];
          return [newWord, ...currentWordList];
        });
      }

      if (data.isExistingWord) alert("Word already added!");
      setIsDataLoading(false);
    } catch (err) {
      console.log("msg: ", err);
    }
  }

  async function toggleWordState(id, is_mastered) {
    setWordList((currentWordList) => {
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
    setWordList((currentWordList) => {
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
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: 4,
        marginTop: "50px",
      }}
    >
      <h2>+ New Word</h2>
      <NewWordForm onSubmit={addWord} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          my: 0.5,
        }}
      >
        <Box>Words</Box>
      </Box>
      <Divider sx={{ border: "0.5px solid gray", width: "100%" }} />
      {isDataLoading ? <Loader /> : <></>}
      <WordList
        wordList={wordList}
        toggleWordState={toggleWordState}
        deleteWord={deleteWord}
      />
      <BottomNav />
    </Box>
  );
}
