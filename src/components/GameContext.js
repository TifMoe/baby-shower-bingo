import React, { useReducer, createContext, useCallback } from "react";
import { shuffleCards, cardOptions } from "./BoardSetup"

export const GameContext = createContext();
const board = shuffleCards(cardOptions)

const initialState = {
  phase: 1,
  name: null,
  cards: board,
};

const NEW_PHASE = "NEW_PHASE";
const ADD_NAME = "ADD_NAME";
const UPDATE_CARD = "UPDATE_CARD";

export const reducer = (state = {}, action) => {
  if (action.type === NEW_PHASE) {
    state.phase = action.payload.phase;
    return { ...state };
  }

  if (action.type === UPDATE_CARD) {
    let cardIndex = state.cards.findIndex((card => card.id === action.payload.card.id));
    state.cards[cardIndex] = action.payload.card;
    return { ...state };
  }

  if (action.type === ADD_NAME) {
    state.name = action.payload.name;
    return { ...state };
  }

  return state;
};

export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const newPhase = useCallback(
    (phase) => {
      dispatch({
        type: NEW_PHASE,
        payload: {
          phase,
        },
      });
    },
    [dispatch]
  );

  const addName = useCallback(
    (name) => {
      dispatch({
        type: ADD_NAME,
        payload: {
          name,
        },
      });
    },
    [dispatch]
  );

  const updateCard = useCallback(
    (card) => {
      dispatch({
        type: UPDATE_CARD,
        payload: {
          card,
        },
      });
    },
    [dispatch]
  );

  const value = {
    state,
    newPhase,
    addName,
    updateCard
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
