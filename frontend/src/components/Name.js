import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../libs/GameContext";
import { useFetch } from '../libs/fetchReducer';

export default function Name() {
    const { state, updateGame } = useContext(GameContext);
    const [name, updateName] = useState("");
    const [data, isLoading, isError] = useFetch(
        "https://api.tiffanymoeller.com/moeller-party",
        {headers: {"Content-Type" : "application/json"}},
    );

    useEffect(() => {
        if (data && data.cards) {
            updateGame(data);
        }
    }, [data])

    if (state.phase !== 1) {
        return null;
    }

    if (isLoading || isError) {
        return null;
    }

    async function onChange(e) {
        updateName(e.currentTarget.value)
    }

    async function onSubmit(e) {
        e.preventDefault();
        // After they submit their name move to next phase
        if (!valid(name)) {
            alert('Please enter a name less than 20 characters!')
            return 
        } 
        state.name = name;
        state.phase = 2;
        updateGame(state);
    }

    function valid(name) {
        if (!name || name.length > 20) {
            return false
        }
        return true
    }

    return (
        <form autoComplete="off" onSubmit={onSubmit}>
            <label>
                <input 
                    type="text" 
                    name="name"
                    placeholder="Enter your name"
                    onChange={onChange}
                    value={name}
                />
            </label>
            <input type="submit" value="Submit" />
       </form>
    )
}