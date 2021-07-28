import React, { useContext } from "react";
import { GameContext } from "../libs/GameContext";


export default function ClearBoardButton() {
    const { state, updateGame } = useContext(GameContext);

    // if (state.phase !==2) {
    //     return null;
    // }

    const clearBoard = async () => {
        state.phase = 1;
        state.name = "";
        state.cards = [];
        updateGame(state)
    }

    return (
        <button className="clear" onClick={clearBoard}>New Board</button>
    )
}
