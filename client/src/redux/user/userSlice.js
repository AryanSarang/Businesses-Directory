import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logOutUserStart: (state) => {
            state.loading = true;
        },
        logOutUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        logOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        consulatantFormStart: (state) => {
            state.loading = true;
        },
        consulatantFormSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        consulatantFormFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        notificationStart: (state) => {
            state.error = null;
        },
        notificationFailure: (state, action) => {
            state.error = action.payload;
        },
        notificationSuccess: (state, action) => {
            state.error = null;
            state.currentUser = action.payload;
        },
        blogSubmitStart: (state) => {
            state.loading = true;
        },
        blogSubmitFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        blogSubmitSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        blogApprovalStart: (state) => {
            state.loading = true;
        },
        blogApprovalFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        blogApprovalSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        constultantUpdateStart: (state) => {
            state.loading = true;
        },
        consultantUpdateFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        consultantUpdateSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
    }
});

export const { signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserFailure,
    updateUserSuccess, logOutUserStart,
    logOutUserFailure,
    logOutUserSuccess,
    consulatantFormStart,
    consulatantFormFailure,
    consulatantFormSuccess,
    notificationFailure,
    notificationStart,
    notificationSuccess,
    blogSubmitStart,
    blogSubmitFailure,
    blogSubmitSuccess,
    blogApprovalStart,
    blogApprovalFailure,
    blogApprovalSuccess,
    constultantUpdateStart,
    consultantUpdateFailure,
    consultantUpdateSuccess,

    clearError
} = userSlice.actions;

export default userSlice.reducer;