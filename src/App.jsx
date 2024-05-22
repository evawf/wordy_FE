import { useState, useEffect } from "react";
import { NewWordForm } from "../NewWordForm";
import { WordList } from "../WordList";
import axios from "axios";

export default function App() {
  const [wordList, setWordList] = useState(() => {
    const localValue = localStorage.getItem("WORDS");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    localStorage.setItem("WORDS", JSON.stringify(wordList));

    async function getWordsData() {
      try {
        // const { data } = await axios.get(`${url}/allwords`);
        // console.log("data: ", data);
      } catch (err) {
        console.log("msg: ", err);
      }
    }

    getWordsData();
  }, [wordList]);

  async function addWord(newWord) {
    console.log("new word: ", newWord);

    try {
      const addNewWord = await axios.post(`${url}/new`, {
        newWord: newWord,
      });

      const data = addNewWord.data;
      console.log(data);
      if (data.newWordAdded) {
        const newWord = { id: data.id, word: data.newWord, mastered: false };

        setWordList((currentWordList) => {
          return [...currentWordList, newWord];
        });
      }

      if (data.isExistingWord) alert("Word already added!");
    } catch (err) {
      console.log("msg: ", err);
    }
  }

  function toggleWordState(id, mastered) {
    setWordList((currentWordList) => {
      return currentWordList.map((word) => {
        if (word.id === id) {
          return { ...word, mastered };
        }

        return word;
      });
    });
  }

  function deleteWord(id) {
    setWordList((currentWordList) => {
      return currentWordList.filter((word) => word.id !== id);
    });
  }

  console.log("new word list: ", wordList);

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
