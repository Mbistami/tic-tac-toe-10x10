import React from "react";

const MainMenu = ({ startGame }) => {
  return (
    <div className="main-menu">
      <p onClick={() => startGame("cmp")}>New Game (vs Computer)</p>
      <p onClick={() => startGame("cmpx")}>New Game (vs Player)</p>
    </div>
  );
};

export default MainMenu;
