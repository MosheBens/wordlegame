import React, { useContext, useCallback, useEffect, useMemo } from 'react';
import { AppContext } from '../App';
import Key from './Key';

function Keyboard() {
  const { onEnter, onDelete, onSelectLetter, disabledLetters } = useContext(AppContext);

  const keyboardLines = useMemo(() => [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
  ], []);

  const handleKeyboard = useCallback((event) => {
    const key = event.key.toUpperCase();

    if (key === "ENTER") {
      onEnter();
    } else if (key === "BACKSPACE") {
      onDelete();
    } else {
      const foundKey = keyboardLines.flat().find((k) => k.toUpperCase() === key);
      if (foundKey) {
        onSelectLetter(foundKey);
      }
    }
  }, [onEnter, onDelete, onSelectLetter, keyboardLines]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className='keyboard'>
      {keyboardLines.map((line, index) => (
        <div className={`line${index + 1}`} key={index}>
          {line.map((key) => (
            <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)} bigKey={key === "ENTER" || key === "DELETE"} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
