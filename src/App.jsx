import { useState } from "react";
import { NewWordForm } from "../NewWordForm";
import { WordList } from "../WordList";

export default function App() {
  const [wordList, setWordList] = useState([]);

  function addWord(newWord) {
    setWordList((currentWordList) => {
      return [
        ...currentWordList,
        { id: crypto.randomUUID(), word: newWord, mastered: false },
      ];
    });
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
