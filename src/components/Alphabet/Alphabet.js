import "./Alphabet.css";
import axios from "axios";

function Alphabet({
  guessedLetters,
  setGuessedLetters,
  setErrors,
  userName,
  setScore,
}) {
  const al = [
    "A",
    "Ą",
    "B",
    "C",
    "Ć",
    "D",
    "E",
    "Ę",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "Ł",
    "M",
    "N",
    "Ń",
    "O",
    "Ó",
    "P",
    "R",
    "S",
    "Ś",
    "T",
    "U",
    "W",
    "Y",
    "Z",
    "Ź",
    "Ż",
  ];

  const handleClickLetter = (letter) => {
    setGuessedLetters([...guessedLetters, letter]);

    axios
      .post("http://localhost:8080/api/hangman/word/guess", {
        letter: letter,
        playerName: userName,
      })
      .then((response) => {
        if (response.status === 200) {
          setErrors(response.data.mistakes);
          setScore(response.data.score);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Alphabet">
      {al.map((elem) => {
        return (
          <button
            key={elem}
            className={guessedLetters.includes(elem) ? "Disabled" : "Active"}
            onClick={() => handleClickLetter(elem)}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
}

export default Alphabet;
