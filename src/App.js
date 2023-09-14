// import logo from './logo.svg';
import {useState, useEffect} from 'react';
import './App.css';

function App() {
  function replaceCharacterWithAsterisks(originalString, index, replacement) {
    return originalString.substring(0, index) + replacement + originalString.substring(index + 1);
  }

  let [hangman, setHangman] = useState(<img src="./hangman-withoutrope.png" alt="hi" className="hangman" />);
  let [message, setMessage] = useState(<span className="message">Try To Guess A Character You Think Is Almost In Most Fruit</span>);
  let [fruit, setFruit] = useState("");
  const [showJSX, setShowJSX] = useState(1);
  const alphabet = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  const [mysteryWord, setMysteryWord] = useState("");
  let [tries, setTries] = useState(5);
  const [guessed, setGuessed] = useState([]);
  const [firstGuess, setFirstGuess] = useState(false);

  useEffect(() => {
    const fruits = [
      "raspberry", "pumpkin", "plum", "kiwi", "guava", "coconut", "apple", "watermelon",
      "orange", "pear", "cherry", "strawberry", "grape", "mango", "blueberry", "pomegranate",
      "plum", "banana", "papaya", "kiwi", "pineapple", "apricot", "grapefruit", "melon",
      "avocado", "peach", "blackberry", "mulberry", "kumquat", "date",
    ];
    
    let randNum = Math.floor(Math.random() * 30);
    let randFruit = fruits[randNum];
    setFruit(randFruit);
    setMysteryWord(fruit);
      let mw = "";
      for (let index = 0; index < fruit.length; index++) {
        mw += "*";
      }
      setMysteryWord(mw);
    }, [fruit])

  
  const handleKeyDown = (e) => {
    if (e.key === "Enter"){
      let Guess = e.target.value;
      if (!alphabet.includes(Guess) || Guess === ""){
        setMessage(<span className="message warning">Please Enter A Valid English Alphabet!</span>);
        e.target.value = "";
        return;
      }
      let correctGuess = false;
      if (firstGuess === true) {
        console.log(Guess, guessed)
        if (Guess !== '' && guessed.includes(Guess)) {
            setMessage(<span className="message tryAgain">You've Already Guessed This Character!</span>);
            e.target.value = "";
            return;
          }
          else{
            setGuessed([...guessed, Guess]);
          }
        
      }
      else{
        setGuessed([...guessed, Guess]);
      }
      
      setFirstGuess(true); 

      let modifiedMysteryWord = mysteryWord;
      for (let i = 0; i < fruit.length; i++) {
        if (fruit[i] === Guess) {
          modifiedMysteryWord = replaceCharacterWithAsterisks(modifiedMysteryWord, i, Guess);
          setMessage(<span className="message success">You Guessed Correctly. Nicely Done!</span>);
          correctGuess = true;
        }
      }
      setMysteryWord(modifiedMysteryWord);

      if (correctGuess === true) {
        if (modifiedMysteryWord === fruit) {
          console.log("win");
          setShowJSX(2);
        }
      }
  
      if (correctGuess === false) {
        setTries(tries-=1);
        setMessage(<span className="message danger">Wrong Guess. Try Again!</span>);
        e.target.value = "";
      } 

      if (tries === 0) {
        console.log("lose");
        setShowJSX(3);
      }
  
    }
    e.target.value = "";
    switch (tries) {
      case 5:
        setHangman(<img src="./hangman-withoutrope.png" alt="hi" className="hangman" />);
        break;

      case 4:
        setHangman(<img src="./hangman-withouthead.png" alt="hi" className="hangman" />);
        break;
    
      case 3:
        setHangman(<img src="./hangman-withoutbody.png" alt="hi" className="hangman" />);
        break;

      case 2:
        setHangman(<img src="./hangman-withoutarms.png" alt="hi" className="hangman" />);
        break;

      case 1:
        setHangman(<img src="./hangman-withoutlegs.png" alt="hi" className="hangman" />);
        break;

      case 0:
        setHangman(<img src="./hangman-fullbody.png" alt="hi" className="hangman" />);
        break;
      
      default:
        setHangman(<img src="./hangman-withoutrope.png" alt="hi" className="hangman" />);
        break;
    }
  }

  let jsxToRender;

  switch (showJSX) {
    case 1:
      jsxToRender = (
        <div>
          <p>Guess This Fruit</p>
          <span>{mysteryWord}</span>
          <br />
          <br />
          <label>Enter Your Guess:</label>
          <br />
          <input type="text" maxLength={1} name="guess" onKeyDown={handleKeyDown}/>
          <br />
          {message}
          <p className="tries">Tries: {tries}</p>
        </div>
      );
      break;
    case 2:
      jsxToRender = (
        <div className="endgame">
          <h4>You've Won</h4>
          <p>The Fruit Was {fruit}</p>
        </div>
      );
      break;
    case 3:
      jsxToRender = (
        <div className="endgame">
          <h4>You've Lost</h4>
          <p>The Fruit Was {fruit}</p>
        </div>
      );
      break;
    default:
      jsxToRender = null;
  }
  return (
    <div>
      <img src="./hangmanLogo.png" alt="" className="logo"></img>
      <div className="shadow rounded box border border-info bg-info bg-opacity-10 rounded-4">
          {jsxToRender}
          {hangman}
      </div>
    </div>
  );
}

export default App;
