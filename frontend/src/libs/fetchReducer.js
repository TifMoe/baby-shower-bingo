import { useEffect, useReducer } from "react";

// Add constants for reducer actions
const FETCHING = "FETCHING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

const initialState = {
  result: null,
  loading: true,
  error: null,
};

const fetchReducer = (state, action) => {
  if (action.type === FETCHING) {
    return initialState;
  }

  if (action.type === SUCCESS) {
    return {
      result: action.payload.result,
      loading: false,
      error: null,
    };
  }

  if (action.type === ERROR) {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

export const useFetch = (url, options = {}) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: FETCHING });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        let data = Object.keys(response).length === 0 ? response : JSON.parse(response);
        dispatch({
          type: SUCCESS,
          payload: { result: data },
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: ERROR, payload: { error } });
      });
  }, [url]);

  const { result, loading, error } = state;
  return [result, loading, error];
};
