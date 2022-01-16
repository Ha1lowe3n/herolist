import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
    filter: "all",
    filtersList: [],
};

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
    const { request } = useHttp();
    return request("http://localhost:3001/heroes");
});

export const createHero = createAsyncThunk("heroes/createHero", (newHero) => {
    const { request } = useHttp();
    return request(
        `http://localhost:3001/heroes`,
        "POST",
        JSON.stringify(newHero)
    );
});

const slice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        deleteHero(state, action) {
            state.heroes = state.heroes.filter(
                (hero) => hero.id !== action.payload
            );
        },
        changeFilter(state, action) {
            state.filter = action.payload;
        },
    },
    extraReducers: {
        [fetchHeroes.pending]: (state) => {
            state.heroesLoadingStatus = "loading";
        },
        [fetchHeroes.fulfilled]: (state, action) => {
            state.heroes = action.payload;
            state.filtersList = action.payload.map((hero) => hero.element);
            state.heroesLoadingStatus = "idle";
        },
        [fetchHeroes.rejected]: (state) => {
            state.heroesLoadingStatus = "error";
        },
        [createHero.pending]: (state) => {
            state.heroesLoadingStatus = "loading";
        },
        [createHero.fulfilled]: (state, action) => {
            state.heroes.push(action.payload);
            state.heroesLoadingStatus = "idle";
        },
        [createHero.rejected]: (state) => {
            state.heroesLoadingStatus = "error";
        },
        "some/other/action": () => {},
    },
});

export const { deleteHero, changeFilter } = slice.actions;
export default slice.reducer;
