import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Status } from "../../../types/types";


interface UserStateType {
    user: User | null,
    token: string | null,
    error: string | null,
    status: Status
}

const initialState: UserStateType = {
    user: null,
    token: localStorage.getItem('token') || null,
    error: null,
    status: 'idle'
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData: { username: string, password: string }): Promise<{ user: User; token: string } | undefined> => {
      try {
        const response = await axios.post(`${BASE_URL}/login`, userData);
        console.log('API Response:', response.data);  // Log the response to check the structure
        if (response.data && response.data.user && response.data.token) {
          localStorage.setItem('token', response.data.token);
          return response.data; // Ensure both user and token are returned
        } else {
          console.error("User data or token is missing from response.");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  );

export const registerUser  = createAsyncThunk('user/registerUser ', 
    async (userData: { username: string, password: string, organization: string, area?: string }): Promise<{ user: User} | undefined> => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, userData);
            return response.data;
        } 
        catch (error) {
            console.error(error);
        }
    }
);

export const userSlice = createSlice({
    initialState,
    name: 'users',
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.status = 'idle';
        }
    },
    extraReducers(builder) {
        builder
        .addCase(loginUser .pending, (state) => {
            state.status = 'pending';
            state.error = null;
        })
        .addCase(loginUser .fulfilled, (state, action) => {
            if (action.payload) { 
                state.user = action.payload.user;
                state.status = 'fulfilled';
            } else {
                state.error = 'Login failed';
            }
        })
        .addCase(registerUser .fulfilled, (state, action) => {
            if (action.payload) { 
                state.user = action.payload.user;
                state.status = 'fulfilled';
            } else {
                state.error = 'Registration failed'; 
            }
        });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;