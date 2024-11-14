import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../store/userSlice/userSlice"

export const store = configureStore({
    reducer: {
        users: userReducer
    }
})