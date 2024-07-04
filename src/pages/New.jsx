import { useState, useEffect } from "react";
import { NewWordForm } from "../components/NewWordForm";
import { WordList } from "../components/WordList";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Client from "../util";

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
          localStorage.clear();

          navigate("/");
        }
      }

      getWordsData();
    }
  }, []);

  async function addWord(word) {
    const newWord = word.toLowerCase().trim();
    try {
      setIsDataLoading(true);

      const addNewWord = await axios.post(`${url}/new`, {
        newWord: newWord.trim(),
      });

      const data = addNewWord.data;

      if (data.msg === "word added") {
        const addedWord = { id: data.id, word: newWord, is_mastered: false };

        setWordList((currentWordList) => {
          return [addedWord, ...currentWordList];
        });
      }

      if (data.isExistingWord) alert("Word already added!");
      setIsDataLoading(false);
    } catch (err) {
      console.log("msg: ", err);
      console.log(err.response.status);
      setIsDataLoading(false);
      alert("There was an error procesing your word, retry later");
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
      alert("Something went wrong!");
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
      alert("Something went wrong!");
    }
  }

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            backgroundColor: "#333",
            zIndex: 1,
          }}
        >
          <h2 style={{ marginTop: "45px" }}>+ New Word</h2>
          <NewWordForm onSubmit={addWord} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Words</p>
            <Divider
              sx={{
                border: "0.5px solid gray",
                width: "100%",
                marginTop: "10px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "200px",
            marginBottom: "80px",
            width: "100%",
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isDataLoading ? <Loader /> : <></>}
          <WordList
            wordList={wordList}
            toggleWordState={toggleWordState}
            deleteWord={deleteWord}
          />
        </Box>
        <BottomNav />
      </Box>
    </>
  );
}
