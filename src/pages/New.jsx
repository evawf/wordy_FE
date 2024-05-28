import { useState, useEffect } from "react";
import { NewWordForm } from "../components/NewWordForm";
import { WordList } from "../components/WordList";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import { defineWord } from "wordreference";

export default function New() {
  // const [wordList, setWordList] = useState(() => {
  //   const localValue = localStorage.getItem("WORDS");
  //   if (localValue === null) return [];
  //   return JSON.parse(localValue);
  // });

  const [wordList, setWordList] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function getWordsData() {
      try {
        const { data } = await axios.get(`${url}/allwords`);
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
  }, []);

  async function addWord(newWord) {
    try {
      // API Call wordreference to get autolink and definition
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
    } catch (err) {
      console.log("msg: ", err);
    }
  }

  console.log("word list2: ", wordList);

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

      console.log(updateWordStatus.data);
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
      console.log(deleteWord.data);
    } catch (err) {
      console.log("msg: ", err);
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <NewWordForm onSubmit={addWord} />
      <h1 className="header">New words added: </h1>
      <p>Check the box if you have mastered the word.</p>
      <WordList
        wordList={wordList}
        toggleWordState={toggleWordState}
        deleteWord={deleteWord}
      />
      <BottomNav />
    </Box>
  );
}
