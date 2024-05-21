export function WordCard({ mastered, id, word, toggleWordState, deleteWord }) {
  return (
    <li>
      <label htmlFor="wordState"></label>
      <input
        id="wordState"
        type="checkbox"
        checked={mastered}
        onChange={(e) => toggleWordState(id, e.target.checked)}
      />
      {word}
      <button className="btn btn-danger" onClick={() => deleteWord(id)}>
        Remove
      </button>
    </li>
  );
}
