import React, { useContext } from "react";
import { GameContext } from "./GameContext";

export default function Name() {
    const { state, newPhase, addName } = useContext(GameContext);

    if (state.phase !== 1) {
        return null;
    }

    function onChange(e) {
        addName(e.currentTarget.value);
    }

    async function onSubmit(e) {
        e.preventDefault();
        // After they submit their name move to next phase
        newPhase(2)
    }

    return (
        <form autoComplete="off" onSubmit={onSubmit}>
            <label>
                <input 
                    type="text" 
                    name="name"
                    placeholder="Enter your name"
                    onChange={onChange}
                    value={state.name}
                />
            </label>
            <input type="submit" value="Submit" />
       </form>
    )
}