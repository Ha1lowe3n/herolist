import { CONSTS } from "../actions/";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
    filters: ["all"],
    filteredHeroes: [],
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
                filteredHeroes: action.payload,
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
        case CONSTS.ADD_FILTER:
            return {
                ...state,
                filters:
                    action.payload === "all"
                        ? ["all"]
                        : [
                              ...state.filters.filter((f) => f !== "all"),
                              action.payload,
                          ],
                filteredHeroes:
                    action.payload === "all"
                        ? [...state.heroes]
                        : state.heroes.filter(
                              (hero) =>
                                  hero.element === action.payload ||
                                  state.filters.some((f) => f === hero.element)
                          ),
            };
        case CONSTS.DELETE_FILTER: {
            const newArrOfFilters = state.filters.filter(
                (f) => f !== action.payload
            );

            return {
                ...state,
                filters:
                    newArrOfFilters.length === 0 ? ["all"] : newArrOfFilters,
                filteredHeroes:
                    newArrOfFilters.length === 0
                        ? [...state.heroes]
                        : state.heroes.filter((hero) =>
                              action.payload === hero.element
                                  ? false
                                  : state.filters.some(
                                        (f) => f === hero.element
                                    )
                          ),
            };
        }
        default:
            return state;
    }
};

export default reducer;
