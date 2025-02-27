import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Thunk to fetch user learner details
export const fetchUserDetails = createAsyncThunk(
    'user/fetchDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/learners`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success !== true){
                return rejectWithValue(response.data.message)
            }

            return response.data;
        } catch (error) {
            console.error('Fetch User Details Error:', {
                message: error.message,
                response: error.response?.data
            });
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch user details'
            );
        }
    }
);

// Thunk to update user profile
export const updateUserProfile = createAsyncThunk(
    'user/updateUserDetails',
    async ({ _id, userData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/learners/${_id}`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update profile'
            );
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: null,
        loading: false,
        error: null,
        isProfileComplete: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
        // Clear user details on logout
        clearUserDetails: (state) => {
            state.userDetails = null;
            state.isProfileComplete = false;
            state.error = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('userDetails');
        }
    },
    extraReducers: (builder) => {
        // Fetch User Details
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                console.log('User profile:', action.payload);
                state.userDetails = action.payload;
                state.loading = false;
                state.error = null;
                // Check if profile is complete based on your requirements
                state.isProfileComplete = !!(
                    action.payload.firstname &&
                    action.payload.lastname &&
                    action.payload.email
                );
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                console.log('Fetch User Rejected:', action.payload);
                state.loading = false;
                state.error = action.error.message;
                state.userDetails = null;
                state.isProfileComplete = false;
            })
            // Update User Profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
                state.isProfileComplete = !!(
                    action.payload.firstName && 
                    action.payload.lastName && 
                    action.payload.email
                );
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { clearUserDetails } = userSlice.actions;
export default userSlice.reducer;