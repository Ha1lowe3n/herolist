import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetchingError,
    heroesFetched,
    deleteHero,
    createHero,
    changeFilter,
} from "../actions";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
    filter: "all",
    filtersList: [],
};

const reducer = createReducer(initialState, (build) => {
    build
        .addCase(heroesFetching, (state) => {
            state.heroesLoadingStatus = "loading";
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroes = action.payload;
            state.filtersList = action.payload.map((hero) => hero.element);
            state.heroesLoadingStatus = "idle";
        })
        .addCase(heroesFetchingError, (state) => {
            state.heroesLoadingStatus = "error";
        })
        .addCase(deleteHero, (state, action) => {
            state.heroes = state.heroes.filter(
                (hero) => hero.id !== action.payload
            );
        })
        .addCase(createHero, (state, action) => {
            state.heroes.push(action.payload);
            state.heroesLoadingStatus = "idle";
        })
        .addCase(changeFilter, (state, action) => {
            state.filter = action.payload;
        });
});

export default reducer;
