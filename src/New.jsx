import { useState, useEffect } from "react";
import { NewWordForm } from "./NewWordForm";
import { WordList } from "./WordList";
import axios from "axios";

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
      const addNewWord = await axios.post(`${url}/new`, {
        newWord: newWord.trim(),
      });

      const data = addNewWord.data;
      if (data.newWordAdded) {
        const newWord = { id: data.id, word: data.newWord, is_mastered: false };

        setWordList((currentWordList) => {
          return [...currentWordList, newWord];
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
    <>
      <NewWordForm onSubmit={addWord} />
      <h1 className="header">New words added: </h1>
      <p>Check the box if you have mastered the word.</p>
      <WordList
        wordList={wordList}
        toggleWordState={toggleWordState}
        deleteWord={deleteWord}
      />
    </>
  );
}
