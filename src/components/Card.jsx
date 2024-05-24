// var wr = require("wordreference-api");
import { defineWord } from "wordreference";
import { useState, useEffect } from "react";
import Definition from "./Definition";

export function Card({ is_mastered, id, word, toggleWordState, deleteWord }) {
  const [definition, setDefinition] = useState([]);
  const [audioLink, setAudioLink] = useState("");

  async function showDefinition() {
    const definition = await defineWord(word, "French-English");
    setDefinition(definition.sections);
    setAudioLink(definition.audioLinks[0]);
    console.log(definition);
  }

  console.log(definition, audioLink);

  return (
    <li>
      {/* <label htmlFor="wordState"> */}
      <label>
        <input
          // id="wordState"
          type="checkbox"
          checked={is_mastered}
          onChange={(e) => toggleWordState(id, e.target.checked)}
        />
        {word}
      </label>
      <button className="btn btn-prime" onClick={() => showDefinition()}>
        View
      </button>
      <div>
        {definition.length > 0 && (
          <Definition
            definition={definition}
            audioLink={audioLink}
            word={word}
          />
        )}
      </div>

      <button className="btn btn-danger" onClick={() => deleteWord(id)}>
        Remove
      </button>
    </li>
  );
}
