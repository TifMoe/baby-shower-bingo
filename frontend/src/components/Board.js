import React, { useContext, useEffect } from "react";
import Square from './Square';
import FoxSquare from './FoxSquare';
import ClearBoardButton from './ClearBoardButton';
import { shuffleCards, cardOptions } from "../libs/BoardSetup"
import { GameContext } from "../libs/GameContext";
import { useFetch } from '../libs/fetchReducer';


export default function Board() {
    const { state, updateGame } = useContext(GameContext);
    const [data, isLoading, isError] = useFetch(
        "https://api.tiffanymoeller.com/moeller-party",
        {headers: {"Content-Type" : "application/json"}},
    );

    useEffect(() => {
        if (data && data.cards) {
            updateGame(data);
        }
    }, [data])

    if (state.phase !== 2) {
        return null;
    }

    if (isLoading || isError) {
        return null;
    }

    if (state.cards.length === 0) {
        const board = shuffleCards(cardOptions)
        state.cards = board
        updateGame(state)
    }

    return (
        <div className="board">
            <div className="name">{capitalizeFirstLetter(state.name)}'s Baby Bingo Board!</div>
            <div className="grid-container">
                {state.cards.map((card, index) => {
                    console.log(index, card)
                    if (card.type === 'free') {
                        return <FoxSquare />
                    }
                    return (
                        <Square card={card} index={index} />
                    )}
                )}
            </div>
            <ClearBoardButton />
        </div>
    )
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }