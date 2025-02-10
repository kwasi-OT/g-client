import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_ROLES } from '../../routing/routes';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// login thunk for user
export const login = createAsyncThunk(
    'auth/login', 
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/user/auth/signin`, 
                credentials);

            // Determine user role based on email or other criteria
            const userRole = determineUserRole(response.data.user);
            
            // Prepare user data with role
            const userWithRole = {
                ...response.data.user,
                role: userRole
            };

            // Store user info in localStorage with role
            localStorage.setItem('user', JSON.stringify({
                ...userWithRole,
                isVerified: userWithRole.isVerified
            }));

            return {
                ...response.data,
                user: userWithRole
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

// Role determination function
const determineUserRole = (user) => {
    // Default to student role
    if (!user.role) {
        // Add role determination logic
        if (user.email.includes('@student.')) {
            return USER_ROLES.STUDENT;
        }
        if (user.email.includes('@admin.')) {
            return USER_ROLES.ADMIN;
        }
        return USER_ROLES.STUDENT;
    }
    return user.role;
};

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
                    }
                }
            );
            // Clear user info from localStorage
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
        error: null,
        userRole: null
    },
    reducers: {
        setUserRole: (state, action) => {
            state.userRole = action.payload;
            
            // Update localStorage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                storedUser.role = action.payload;
                localStorage.setItem('user', JSON.stringify(storedUser));
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
            state.userRole = action.payload.user?.role || USER_ROLES.STUDENT;

            // Debug logging
            console.log('Login Fulfilled:', {
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                userRole: state.userRole
            });
        })
        .addCase(login.rejected, (state, action) => {
            console.error('Login Rejected:', action.payload);
            state.loading = false;
            state.error = action.payload || 'Login failed';
            state.isAuthenticated = false;
            state.user = null;
            state.userRole = null;
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
            state.userRole = null;
        })
        .addCase(logout.rejected, (state, action) => {
            console.error('Logout Rejected:', action.payload);
            state.loading = false;
            state.error = action.payload || 'Logout failed';
            state.isAuthenticated = false;
            state.user = null;
            state.userRole = null;
        })
    }
});

export const { setUserRole } = authSlice.actions;
export default authSlice.reducer;