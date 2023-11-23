import React, { useContext } from 'react';
import { AppContext } from '../App';

const Key = ({ keyVal, bigKey, disabled }) => {
  const { onSelectLetter, onEnter, onDelete } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === 'ENTER') {
      onEnter();
    } else if (keyVal === 'DELETE') {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  const idName = `${bigKey ? "big" : disabled.toString() && "disabled"}`;

  return (
    <div className='key' id={idName} onClick={selectLetter}>
      {keyVal}
    </div>
  );
};

export default Key;