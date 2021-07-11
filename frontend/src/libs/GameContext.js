import React, { useReducer, createContext, useCallback } from "react";

export const GameContext = createContext();

const initialState = {
  phase: 1,
  name: null,
  cards: [],
};

const UPDATE_GAME = "UPDATE_GAME";
const UPDATE_CARD = "UPDATE_CARD";

export const reducer = (state = {}, action) => {
  if (action.type === UPDATE_GAME) {
    state = action.payload.state;
      // Send updated state to API
      fetch("https://api.tiffanymoeller.com/moeller-party", {
        headers: {"Content-Type" : "application/json"}, 
        method: "PUT", 
        body: JSON.stringify(state)
      });
    return { ...state };
  }

  if (action.type === UPDATE_CARD) {
    let cardIndex = state.cards.findIndex((card => card.id === action.payload.card.id));
    state.cards[cardIndex] = action.payload.card;
    // Send updated state to API
    fetch("https://api.tiffanymoeller.com/moeller-party", {
      headers: {"Content-Type" : "application/json"}, 
      method: "PUT", 
      body: JSON.stringify(state)
    });
    return { ...state };
  }

  return state;
};

export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, (initialState));

  const updateGame = useCallback(
    (state) => {
      dispatch({
        type: UPDATE_GAME,
        payload: {
          state
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
    updateGame,
    updateCard
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
