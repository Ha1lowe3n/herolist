import { createAction } from "@reduxjs/toolkit";

export const CONSTS = {
    HEROES_FETCHING: "HEROES_FETCHING",
    HEROES_FETCHED: "HEROES_FETCHED",
    HEROES_FETCHING_ERROR: "HEROES_FETCHING_ERROR",
    DELETE_HERO: "DELETE_HERO",
    CHANGE_FILTER: "CHANGE_FILTER",
    CREATE_HERO: "CREATE_HERO",
};

export const heroesFetching = createAction(CONSTS.HEROES_FETCHING);

export const heroesFetched = createAction(CONSTS.HEROES_FETCHED);

export const heroesFetchingError = createAction(CONSTS.HEROES_FETCHING_ERROR);

export const deleteHero = createAction(CONSTS.DELETE_HERO);

export const changeFilter = createAction(CONSTS.CHANGE_FILTER);

export const createHero = createAction(CONSTS.CREATE_HERO);
