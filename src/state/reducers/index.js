import { CONSTS } from "../actions/";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
    filter: "all",
    filtersList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTS.HEROES_FETCHING:
            return {
                ...state,
                heroesLoadingStatus: "loading",
            };
        case CONSTS.HEROES_FETCHED:
            return {
                ...state,
                heroes: action.payload,
                filtersList: action.payload.map((hero) => hero.element),
                heroesLoadingStatus: "idle",
            };
        case CONSTS.HEROES_FETCHING_ERROR:
            return {
                ...state,
                heroesLoadingStatus: "error",
            };
        case CONSTS.DELETE_HERO:
            return {
                ...state,
                heroes: state.heroes.filter(
                    (hero) => hero.id !== action.payload
                ),
            };
        case CONSTS.CHANGE_FILTER:
            return {
                ...state,
                filter: action.payload === "all" ? "all" : action.payload,
            };
        case CONSTS.CREATE_HERO:
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: "idle",
            };
        default:
            return state;
    }
};

export default reducer;
