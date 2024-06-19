import React, {useContext} from 'react';
import { AppContext } from '../App';


function Key({keyVal, bigKey}) {
    const {board, setBoard, currAttempt, setCurrAttempt} = useContext(AppContext);
    const selectLetter = () => {
        // If the keyVal is ENTER, ensure letterVal is at the final tile
        // If it is set our attempt to move down a single row
        if (keyVal === "ENTER"){
            if (currAttempt.letterPos !== 7) return;
            setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
        }
        // If the keyVal is DELETE, ensure letterVal is not the first tile
        // Then create a new board so that we can remove the deleted tile 
        //and set the new attempt back to it's previous position
        else if (keyVal === "DELETE") {
            if (currAttempt.letterPos === 0) return;
            const newBoard = [...board];
            newBoard[currAttempt.attempt][currAttempt.letterPos-1] = "";
            setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos-1});
        }
        // For all other letters, ensure that letters only go to the 7th tile
        // If valid set the tile and move the letterPos by 1
        else {
        if (currAttempt.letterPos > 6) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
        }
    }
  return (
    // Adjusting big and small lettering
    <div className='key' id={bigKey && "big"} onClick={selectLetter}>
        {keyVal}
    </div>
  )
}

export default Key