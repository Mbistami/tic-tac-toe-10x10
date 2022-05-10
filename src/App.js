import React, { useState } from "react";
import Game from "./components/Game";
import MainMenu from "./components/MainMenu";

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  return (
    <div>
      {!isGameStarted ? (
        <MainMenu startGame={setIsGameStarted} />
      ) : (
        <Game isCmp={isGameStarted == "cmp" ? true : false} />
      )}
    </div>
  );
};
export default App;
