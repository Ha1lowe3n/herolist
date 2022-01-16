import { configureStore } from "@reduxjs/toolkit";

import reducer from "./slice";

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

console.log(store.getState());

export default store;
