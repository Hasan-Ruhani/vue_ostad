import { createSlice } from '@reduxjs/toolkit';
import { adminLogin, adminLogout, getAdminProfile } from './adminApiSlice';


export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isSuccess: false,
        isLoading: false,
        error: null,
        message: null,
        admin: localStorage.getItem("admin") ? localStorage.getItem("admin") : null,
        profile: localStorage.getItem("profile") ? localStorage.getItem("profile") : null,
    },
    reducers: {
        
        setMessageEmpty: (state) => {
            state.isSuccess = null;
            state.message = null;
            state.error = null;
        }

    },

    extraReducers: (builder) => {

        builder.addCase(adminLogin.pending, (state) => {
            state.isLoading = true;
        }).addCase(adminLogin.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            localStorage.setItem("admin", JSON.stringify(action.payload.data));
            state.admin = action.payload.data;
        }).addCase(adminLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.admin = null;
            localStorage.removeItem("admin");
        })

        .addCase(getAdminProfile.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAdminProfile.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.profile = action.payload.data;
            localStorage.setItem("profile", JSON.stringify(action.payload.data));
        }).addCase(getAdminProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.admin = null;
            state.profile = null;
            localStorage.removeItem("admin");
            localStorage.removeItem("profile");
        })

        .addCase(adminLogout.pending, (state) => {
            state.isLoading = true;
        }).addCase(adminLogout.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.admin = null;
            state.profile = null;
            state.message = action.payload.message;
            localStorage.removeItem("admin");
            localStorage.removeItem("profile");
        }).addCase(adminLogout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

    }

})


export const { setMessageEmpty } = adminSlice.actions;

export default adminSlice.reducer;


