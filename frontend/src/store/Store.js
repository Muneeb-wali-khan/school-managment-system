import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/regLogin";

export const store = configureStore({
    reducer: {
        user: authReducers
    }
})



export default store