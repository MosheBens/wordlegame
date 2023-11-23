import React, { useContext } from 'react'
import { AppContext } from '../App';
 
function GameOver() {

    const {gameOver, correctWord,currAttempt} = useContext(AppContext);
  return (
    <div className='gameover'>
        <h1>{gameOver.guessedWord
           ? "You guessed the word correctly" 
           : "You  Are Failed To guessed After 6 Times"}
         </h1>
        <h1>Correct Word Is: {correctWord} </h1>
        {gameOver.guessedWord && (
          <h1>You Guessed in {currAttempt.attempt} attemps God Job ! ! !</h1>)
        }
    </div>
  )
}

export default GameOver