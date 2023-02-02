import "./Word.css";

function Word({ guessedLetters, wordToGuess }) {
  return (
    <div className="Word">
      {wordToGuess
        ?.toUpperCase()
        .split("")
        .map((letter, index) => {
          return (
            <span className="LetterContainer" key={index}>
              <span
                className={
                  guessedLetters.includes(letter) ? "visible" : "hidden"
                }
              >
                {letter}
              </span>
            </span>
          );
        })}
    </div>
  );
}

export default Word;
