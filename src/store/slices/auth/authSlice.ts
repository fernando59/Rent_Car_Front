import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
export interface IUser {
    email: string | null
    rols:string | null

}
export interface AuthState {
    status: string
    user: IUser 
    errorMessage: string | null
    token: string | null

}

const initialState: AuthState = {
    status: 'cheking',
    errorMessage: null,
    user: {
        email:null,
        rols:null
    },
    token: null


}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAuth: (state, { payload }) => {
            state.status = 'authenticated' // 'checking', 'not-authenticated', 'authenticated'
            const userObject:any =jwt_decode(payload)
            const values:any =Object.values(userObject)
            state.user.email = values[0]
            state.user.rols = values[3]
            localStorage.setItem('token', payload)

        },
        logoutAuth: (state) => {
            state.status = 'not-authenticated' // 'checking', 'not-authenticated', 'authenticated'
            localStorage.removeItem('token')

        },

        checkingCredentials: (state) => {
            const token = localStorage.getItem('token');
            if (!token) {
                state.status = 'not-authenticated'
            } else {
                localStorage.setItem('token', token)
                state.status = 'authenticated'
                const userObject:any =jwt_decode(token)
                const values:any =Object.values(userObject)
                state.user.email = values[0]
                state.user.rols = values[3]
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { checkingCredentials, loginAuth, logoutAuth } = authSlice.actions
