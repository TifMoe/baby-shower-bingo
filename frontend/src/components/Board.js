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

    // if (state.phase !== 2) {
    //     return null;
    // }

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
            <div className="name">{titleText(isWinner(state))}</div>
            <div className="grid-container">
                {state.cards.map((card, index) => {
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

function titleText(isWinner) {
    if (isWinner) {
        return "Congratulations! You have bingo!!"
    }
    return "Tiffany's Baby Bingo Board!"
} 

function isWinner(state) {
    let board = calcBoard(state)
    let winner = false

    // Loop to check rows for bingo
    for (let i = 0; i < board.length; i++) {
        let winner = true
        for (let j = 0; j < board.length; j++) {
            if (!board[i][j]) {
                winner = false;
                break;
            }
        }
        if (winner) {
            return winner
        }
    } 

    // Loop to check columns for bingo
    for (let i = 0; i < board.length; i++) {
        let winner = true
        for (let j = 0; j < board.length; j++) {
            if (!board[j][i]) {
                winner = false;
                break;
            }
        }
        if (winner) {
            return winner
        }
    }

    // Loop to check top left diagonal for bingo
    winner = true
    for (let i = 0; i < board.length; i++) {
        if (!board[i][i]) {
            winner = false;
            break;
        }
    }
    if (winner) {
        return winner
    }

    console.log(board)
    // Loop to check top right diagonal for bingo
    let i = 0
    winner = true
    for (let j = board.length-1; j >= 0; j--) {
        if (!board[i][j]) {
            winner = false;
            break;
        }
        i++
    }
    if (winner) {
        return winner
    }
}

function calcBoard(state) {
    // Create one dimensional array
    let board = new Array(5);
      
    // Loop to create 2D array using 1D array
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(5);
    };

    // Make board selected values into array
    state.cards.forEach((card, index) => {
        let col = (index) % 5
        let row = Math.floor(index/5)
        board[row][col] = card.selected
    });

    return board;
}