export function Card({ is_mastered, id, word, toggleWordState, deleteWord }) {
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
      <button className="btn btn-danger" onClick={() => deleteWord(id)}>
        Remove
      </button>
    </li>
  );
}
