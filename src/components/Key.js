import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled, correct, almost }) {
  const { onDelete, onSelectLetter, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    // Adjusting big and small lettering
    <div
      className="key"
      id={
        bigKey
          ? "big"
          : (disabled && "disabled") ||
            (correct && "correct") ||
            (almost && "almost")
      }
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
