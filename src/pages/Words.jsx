import { useState, useEffect } from "react";
import { Cards } from "../components/Cards";
import axios from "axios";

export default function Words() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [words, setWords] = useState([]);

  useEffect(() => {
    async function getRandomWords() {
      const getWords = await axios.get(`${url}/words`);

      setWords(getWords.data.words);
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

      console.log(updateWordStatus.data);
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
      console.log(deleteWord.data);
    } catch (err) {
      console.log("msg: ", err);
    }
  }

  console.log("words: ", words);
  return (
    <>
      <h1>This is words page, review random words: 1-10</h1>
      <Cards
        words={words}
        toggleWordState={toggleWordState}
        deleteWord={deleteWord}
      />
    </>
  );
}
