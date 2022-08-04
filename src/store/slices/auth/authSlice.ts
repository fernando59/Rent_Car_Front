import { createSlice } from '@reduxjs/toolkit'

export interface IUser{
    name:string

}
export interface AuthState {
    status: string
    user:IUser | {}
    errorMessage: string | null
    token:string |null

}

const initialState: AuthState = {
    status: 'cheking',
    errorMessage: null,
    user:{},
    token:null


}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAuth: (state, { payload }) => {
             state.status = 'authenticated' // 'checking', 'not-authenticated', 'authenticated'
             localStorage.setItem('token',payload)
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
            const token = localStorage.getItem('token');
            console.log('enter')
            if ( !token ) {
                state.status = 'not-authenticated'
            }else{

                localStorage.setItem('token',token)
                state.status ='authenticated'
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const {checkingCredentials,loginAuth } = authSlice.actions
