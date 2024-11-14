import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Organization, Status } from "../../../types/types";

interface OrganizationStateType {
    organizations: Organization[];
    status: Status;
    token: string | null;
    error: string | null;
}

const initialState: OrganizationStateType = {
    organizations: [],
    status: 'idle',
    token: null,
    error: null,
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchOrganizations = createAsyncThunk(
    'organization/fetchOrganizations',
    async (userData: { username: string; token: string }): Promise<Organization[] | undefined> => {
        try {
            // Send token and username in request headers
            const response = await axios.get(`${BASE_URL}/arsenal`, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`, 
                    'Username': userData.username,               
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Fetch organization failed');
        }
    }
);

export const organizationSlice = createSlice({
    initialState,
    name: 'organization',
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchOrganizations.pending, (state) => {
            state.status = 'pending';
            state.error = null;
        })
        .addCase(fetchOrganizations.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = 'fulfilled';
                state.organizations = action.payload;
                state.token = null; 
                state.error = null;
            }
        })
        .addCase(fetchOrganizations.rejected, (state) => {
            state.status = 'rejected';
            state.error = 'Fetch arsenal failed';
        });
    }
});

export default organizationSlice.reducer;
