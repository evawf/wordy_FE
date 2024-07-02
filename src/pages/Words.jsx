import { useState, useEffect } from "react";
import { WordCards } from "../components/WordCards";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Words() {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const url = import.meta.env.VITE_BACKEND_URL;
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setIsDataLoading(true);
      async function getRandomWords() {
        try {
          const getWords = await axios.get(`${url}/words`);
          setWords(getWords.data.words);
          setIsDataLoading(false);
        } catch (err) {
          console.log("msg: ", err);
          alert("Something went wrong!");
          navigate("/");
        }
      }
      getRandomWords();
    }
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
      alert("Something went wrong!");
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
      alert("Something went wrong!");
    }
  }

  const handleClick = () => {
    navigate("/new");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          height: "80px",
          position: "fixed",
          background: "#333",
          width: "100%",
          zIndex: 1,
          paddingRight: "30px",
        }}
      >
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Today's Words
        </h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "70px",
          overflow: "auto",
        }}
      >
        {/* <Box sx={{ position: "fixed",  }}> */}
        {/* </Box> */}
        {isDataLoading ? <Loader /> : <></>}
        {words.length ? (
          <WordCards
            words={words}
            toggleWordState={toggleWordState}
            deleteWord={deleteWord}
          />
        ) : (
          <>
            <Button
              variant="outlined"
              sx={{ marginTop: 2 }}
              onClick={() => handleClick()}
              fullWidth
            >
              No word yet? Add new word
            </Button>
          </>
        )}
        <BottomNav />
      </Box>
    </Box>
  );
}
