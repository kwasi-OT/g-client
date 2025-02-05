import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// login thunk for user
export const login = createAsyncThunk(
    'auth/login', 
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/user/auth/signin`, 
                credentials, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Store token securely
            localStorage.setItem('token', response.data.token);

            return {
                user: {
                    user_id: response.data.user_id,
                    email: response.data.email,
                    role: response.data.role
                },
                token: response.data.token
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

// logout thunk for user
export const logout = createAsyncThunk(
    'auth/logout', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/user/auth/logout`, {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            // Clear token and user data
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Logout failed'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        login: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
        },
        logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            console.log('Login Fulfilled:', action.payload);
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            console.error('Login Rejected:', action.payload);
            state.loading = false;
            state.error = action.payload || 'Login failed';
            state.isAuthenticated = false;
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        })
        .addCase(logout.rejected, (state, action) => {
            console.error('Logout Rejected:', action.payload);
            state.loading = false;
            state.error = action.payload || 'Logout failed';
        })
    }
});

// export const { logout } = authSlice.actions;
export default authSlice.reducer;