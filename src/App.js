import "./App.css";
import Alphabet from "./components/Alphabet/Alphabet";
import Word from "./components/Word/Word";
import { useEffect, useState } from "react";
import Hangman from "./components/Hangman/Hangman";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWord, setUserName } from "./redux/userSlice";

function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [errors, setErrors] = useState(0);
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();
  const currentWord = useSelector((state) => state.userReducer.currentWord);
  const userNameFromStore = useSelector((state) => state.userReducer.userName);
  const [userNameInput, setUserNameInput] = useState("");
  const [openPopUp, setOpenPopUp] = useState(true);
  const [showLostPopUp, setShowLostPopUp] = useState(false);

  const getCurrentWord = () => {
    axios
      .get("http://localhost:8080/api/hangman/word")
      .then((response) => dispatch(setCurrentWord(response.data)))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:8080/api/hangman/player",
        JSON.stringify(userNameInput)
      )
      .then((response) => {
        if (response.status === 200) {
          setOpenPopUp(false);
          dispatch(setUserName(userNameInput));
          handleNewGame1(userNameInput);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleNewGame = () => {
    axios
      .post("http://localhost:8080/api/hangman/newGame")
      .then((response) => {
        if (response.status === 200) {
          if (userNameFromStore === "") setOpenPopUp(true);
          setScore(0);
          setGuessedLetters([]);
          setErrors(0);
          setShowLostPopUp(false);
          getCurrentWord();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleNewGame1 = (userName) => {
    axios
      .post("http://localhost:8080/api/hangman/newGame1", {
        playerName: userName,
      })
      .then((response) => {
        if (response.status === 200) {
          setShowLostPopUp(false);
          getCurrentWord();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCurrentWord();
  }, []);

  useEffect(() => {
    if (errors >= 6) {
      setTimeout(function () {
        setShowLostPopUp(true);
      }, 500);
    }
  }, [errors]);

  return (
    <div className="App">
      <div className="HangmanContainer">
        <div className="Username">
          <div>
            UserName: <b>{userNameFromStore}</b>
          </div>
          <button onClick={handleNewGame}>New Game</button>
          <div>
            Score: <b>{score}</b>
          </div>
        </div>
        <Alphabet
          guessedLetters={guessedLetters}
          setGuessedLetters={setGuessedLetters}
          setErrors={setErrors}
          userName={userNameFromStore}
          setScore={setScore}
        />
        <Word guessedLetters={guessedLetters} wordToGuess={currentWord} />
        <Hangman errors={errors} />
      </div>
      {openPopUp && (
        <div className="PopUp">
          <div className="PopUpContent">
            <form className="Form" onSubmit={handleSubmit}>
              <div>UserName</div>
              <input
                onChange={(e) => setUserNameInput(e.target.value)}
                className="input"
                id="input"
                type="text"
                required
              />
              <button type="submit">Play</button>
            </form>
          </div>
        </div>
      )}
      {currentWord
        .toUpperCase()
        .split("")
        .every((elem) => guessedLetters.includes(elem)) && (
        <div className="PopUp">
          <div className="PopUpContent">
            <form className="Form" onSubmit={handleSubmit}>
              <div>You won!</div>
              <div>
                Score: <b>{score}</b>
              </div>
              <button onClick={handleNewGame}>New Game</button>
            </form>
          </div>
        </div>
      )}
      {showLostPopUp && (
        <div className="PopUp">
          <div className="PopUpContent">
            <form className="Form" onSubmit={handleSubmit}>
              <div>You lost!</div>
              <div>
                The word was: <b>{currentWord}</b>
              </div>
              <button onClick={handleNewGame}>New Game</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
