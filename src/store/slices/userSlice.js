import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { login, logout } from './authSlice';

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (id, {getState, rejectWithValue }) => {
        try {
            const user = getState().auth.user;

            if (!user) {
                throw new Error('User not found');
            }

            console.log('Fetching User:', user)

            const response = await axios.get(`/api/learners/${user.user_id}`);

            console.log('Fetched User:', response.data);

            return response.data;
        } catch (error) {
            console.error('Fetch User Error:', {
                message: error.message,
                response: error.response?.data
            });
            return rejectWithValue(error.response.data);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log('User Payload:', action.payload);
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                console.log('User profile:', action.payload);
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                console.log('Fetch User Rejected:', action.payload);
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default userSlice.reducer;