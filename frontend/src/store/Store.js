import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/regLogin";

export const store = configureStore({
    reducer: {
        user: authReducers
    }
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: false,
    // }),
})



export default store