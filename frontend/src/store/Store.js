import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/regLogin";
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["userAuth"]
}

const persistedReducer = persistReducer(persistConfig, authReducers)

export const store = configureStore({
    reducer: {
        user: persistedReducer
    }
})



export const persistor = persistStore(store)