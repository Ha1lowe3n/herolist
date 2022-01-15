export const CONSTS = {
    HEROES_FETCHING: "HEROES_FETCHING",
    HEROES_FETCHED: "HEROES_FETCHED",
    HEROES_FETCHING_ERROR: "HEROES_FETCHING_ERROR",
    DELETE_HERO: "DELETE_HERO",
    ADD_FILTER: "ADD_FILTER",
    DELETE_FILTER: "DELETE_FILTER",
    CREATE_HERO: "CREATE_HERO",
};

export const heroesFetching = () => ({
    type: CONSTS.HEROES_FETCHING,
});

export const heroesFetched = (heroes) => ({
    type: CONSTS.HEROES_FETCHED,
    payload: heroes,
});

export const heroesFetchingError = () => ({
    type: CONSTS.HEROES_FETCHING_ERROR,
});

export const deleteHero = (heroId) => ({
    type: CONSTS.DELETE_HERO,
    payload: heroId,
});

export const addFilter = (filter) => ({
    type: CONSTS.ADD_FILTER,
    payload: filter,
});

export const deleteFilter = (filter) => ({
    type: CONSTS.DELETE_FILTER,
    payload: filter,
});

export const createHero = (hero) => ({
    type: CONSTS.CREATE_HERO,
    payload: hero,
});
