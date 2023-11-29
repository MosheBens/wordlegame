import { createContext, useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault ,generateWordSet} from './Words';
import GameOver from './components/GameOver';
import GameOverPhotoEnd from "./gameoverphoto.jfif"
import WinPhotoEnd from "./winphoto.png"

export const AppContext = createContext();

function App() {

  const [board,setBoard] = useState(boardDefault);
  const [currAttempt,setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord,setCorrectWord] = useState("");
  const [endGamePhoto,setEndGamePhoto] = useState();
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });


  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      // console.log(words);
    })
  }, [])



  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    
    if (wordSet.has(currWord.toLowerCase() + "\r")) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word Not Found In The DataBase, Try Another Word");
    }

    if(currWord.toLowerCase() + "\r" === correctWord){
      setGameOver({gameOver:true, guessedWord:true});
      setEndGamePhoto(<img src={WinPhotoEnd} width={"300px"} alt='photoWin'/>)

      return;
    }
    if(currAttempt.attempt === 5){
      setGameOver({gameOver:true, guessedWord:false});
      setEndGamePhoto(<img src={GameOverPhotoEnd} width={"300px"} alt='photoLose'/>)
    }
  };

  const onDelete = () => {
    if(currAttempt.letterPos === 0){
      return;
    }
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos -1});
  };
 
  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4){
      return ;
    }
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
  };
  return (
    <div className="App" style={{backgroundColor: gameOver.guessedWord ? "lightgreen" : "#121212"}} >
        <nav>
          <h1>Wordle</h1>
        </nav>
        <AppContext.Provider value={{board,setBoard,currAttempt,setCurrAttempt,onSelectLetter,onEnter,onDelete,correctWord,setDisabledLetters,disabledLetters,gameOver, setGameOver}}>
        <div className='game'>
          <Board    />
         {gameOver.gameOver ? <GameOver/> :  <Keyboard   />}
        </div>
        </AppContext.Provider>
        {endGamePhoto}
        
    </div>
  );
}

export default App;
