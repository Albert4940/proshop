import {createSlice} from '@reduxjs/toolkit'

const USER_INFO = "userInfo";

const initialState = {
    userInfo: localStorage.getItem(USER_INFO) ? JSON.parse(localStorage.getItem(USER_INFO)) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem(USER_INFO, JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem(USER_INFO);
        }
    }
})

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;