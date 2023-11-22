import React, { useContext } from 'react'
import { AppContext } from '../App';

function GameOver() {

    const {gameOver, correctWord,currAttempt} = useContext(AppContext);
  return (
    <div className='gameover'>
        <h1>{gameOver.guessedWord ? "You corrently guessed" : "you failed"}</h1>
        <h1>Correct: {correctWord} </h1>
        {gameOver.guessedWord && (<h1>You Guessed in {currAttempt.attempt} attemps</h1>)}
    </div>
  )
}

export default GameOver