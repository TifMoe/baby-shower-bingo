import React, { useContext, useEffect } from "react";
import Square from './Square';
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
            <div className="name">Hello, {state.name}!</div>
            <div className="grid-container">
                {state.cards.map((card, index) => {
                    console.log(index, card)
                    return (
                        <Square card={card} index={index} />
                    )}
                )}
            </div>
            <ClearBoardButton />
        </div>
    )
}