import React, { useContext } from "react";
import Square from './Square';
import { GameContext } from "./GameContext";


export default function Board() {
    const { state } = useContext(GameContext);

    if (state.phase !== 2) {
        return null;
    }

    return (
        <div>
            Hello, {state.name}
            <div className="grid-container">
                {state.cards.map((card, index) => {
                    console.log(index, card)
                    return (
                        <Square card={card} index={index} />
                    )}
                )}
            </div>
        </div>
    )
}