import { createSlice } from '@reduxjs/toolkit'

export interface IUser{
    name:string

}
export interface AuthState {
    status: string
    user:IUser | {}
    errorMessage: string | null

}

const initialState: AuthState = {
    status: 'cheking',
    errorMessage: null,
    user:{}


}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            // state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            // state.uid = payload.uid;
            // state.email = payload.email;
            // state.name = payload.displayName;
            // state.photoURL = payload.photoURL;
            // state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            // state.status = 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            // state.uid = null;
            // state.email = null;
            // state.name = null;
            // state.photoURL = null;
            // state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            // state.status = 'checking';
        }
    }
})

// Action creators are generated for each case reducer function
export const { } = authSlice.actions
