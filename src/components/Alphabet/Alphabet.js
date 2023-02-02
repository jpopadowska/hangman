import "./Alphabet.css";
import axios from "axios";

function Alphabet({
  guessedLetters,
  setGuessedLetters,
  setErrors,
  wordToGuess,
  userName,
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
    if (!wordToGuess.toUpperCase().split("").includes(letter))
      setErrors((prev) => prev + 1);

    fetch("http://localhost:8080/api/hangman/word/guess", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({
        letter: letter,
        playerName: userName,
      }),
    }).then((response) => console.log(response));
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
