import Letter from './Letter';

function Board() {
  const numRows = 6; //rows Number
  const numCols = 5; //cols Number

  // create the board with for loop 6X5
  const renderRows = () => {
    const rows = [];
    for (let row = 0; row < numRows; row++) {
      const rowElements = [];
      for (let col = 0; col < numCols; col++) {
        rowElements.push(<Letter key={col} letterPos={col} attemptVal={row} />);
      }
      rows.push(<div key={row} className='row'>{rowElements}</div>);
    }
    return rows;
  };

  //Show the board on screen with the help of renderRow function
  return (
    <div className='board'>
      {renderRows()}
    </div>
  );
}

export default Board;
