import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
    filter: "all",
    filtersList: [],
};

const slice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroesFetching(state) {
            state.heroesLoadingStatus = "loading";
        },
        heroesFetched(state, action) {
            state.heroes = action.payload;
            state.filtersList = action.payload.map((hero) => hero.element);
            state.heroesLoadingStatus = "idle";
        },
        heroesFetchingError(state) {
            state.heroesLoadingStatus = "error";
        },
        deleteHero(state, action) {
            state.heroes = state.heroes.filter(
                (hero) => hero.id !== action.payload
            );
        },
        createHero(state, action) {
            state.heroes.push(action.payload);
            state.heroesLoadingStatus = "idle";
        },
        changeFilter(state, action) {
            state.filter = action.payload;
        },
    },
});

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
    createHero,
    changeFilter,
} = slice.actions;

export default slice.reducer;
