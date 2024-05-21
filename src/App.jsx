import { useState } from "react";

export default function App() {
  const [newWord, setNewWord] = useState("");
  const [wordList, setWordList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setWordList((currentWordList) => {
      return [
        ...currentWordList,
        { id: crypto.randomUUID(), title: newWord, mastered: false },
      ];
    });

    setNewWord("");
  }

  function toggleWordState(id, mastered) {
    console.log("word status: ", mastered);

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
    console.log("clicked", id);
  }

  console.log("new word list: ", wordList);

  return (
    <>
      <form onSubmit={handleSubmit} className="new-word-form">
        <div className="form-row">
          <label htmlFor="">+ New word</label>
          <input
            type="text"
            name="word"
            id="word"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">New words added: </h1>
      <p>Check the box if you have mastered the word.</p>
      <ul className="list">
        {wordList.map((word) => {
          return (
            <li key={word.id}>
              <label htmlFor="wordState"></label>
              <input
                id="wordState"
                type="checkbox"
                checked={word.mastered}
                onChange={(e) => toggleWordState(word.id, e.target.checked)}
              />
              {word.title}
              <button
                className="btn btn-danger"
                onClick={(e) => deleteWord(word.id)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
