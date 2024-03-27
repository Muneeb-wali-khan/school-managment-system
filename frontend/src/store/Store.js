import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/regLogin";
import userProfileSlice from "./features/user.reducer";
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import teacherReducers from "./features/teacher.reducers";
import adminReducers from "./features/admin.reducers";
import studentReducers from "./features/student.reducers";



const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["userAuth"],
};


const persistedReducer = persistReducer(persistConfig, authReducers)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        profile: userProfileSlice,
        teacher: teacherReducers,
        student: studentReducers,
        admin: adminReducers
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})



export const persistor = persistStore(store)