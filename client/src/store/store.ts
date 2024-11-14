import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./features/userSlice/userSlice"
import organizationReducer from './features/organizationSlice/organization'

export const store = configureStore({
    reducer: {
        user: userReducer,
        organization: organizationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch