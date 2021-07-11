import React, { useContext } from "react";
import { GameContext } from "../libs/GameContext";

export default function Square( {card, index} ) {
    const { updateCard } = useContext(GameContext);

    const OPEN = {background: 'var(--accent-cool)', font: 'var(--main-bg)'};
    const CLOSED = {background: 'var(--white-transparent)', font: 'var(--submit-bg)'};
    const FREE = {background: 'var(--main-bg)', font: 'var(--light-font)'};

    const cardStyle = () => {
        if (card.type === 'free') {
            return FREE
        }

        if (card.open) {
            return OPEN
        }

        return CLOSED
    }
    
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
                backgroundColor: cardStyle().background,
                color: cardStyle().font
            }} 
            key={index}
            onClick={onClick}
        >{card.item}</button>
    )
}