import React, { useContext } from "react";
import { GameContext } from "./GameContext";

export default function Square( {card, index} ) {
    const { updateCard } = useContext(GameContext);

    const CLOSED = {background: '#e9f3f1', font: '#89B0AE'};
    const OPEN = {background: '#89B0AE', font: '#e9f3f1'};
    
    const onClick = () => {
        // Do nothing on click actions for free space
        if (card.type === 'free') {
            return
        }
        card.open = !card.open
        updateCard(card)
    }

    return (
        <button 
            style={{
                backgroundColor: card.open ? OPEN.background : CLOSED.background,
                color: card.open ? OPEN.font : CLOSED.font
            }} 
            key={index}
            onClick={onClick}
        >{card.item}</button>
    )
}