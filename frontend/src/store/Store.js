import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/todos";

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})



export default store