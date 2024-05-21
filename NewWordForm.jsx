import { useState } from "react";

export function NewWordForm({ onSubmit }) {
  const [newWord, setNewWord] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newWord === "") return;
    onSubmit(newWord);

    setNewWord("");
  }

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
    </>
  );
}
