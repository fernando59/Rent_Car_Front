import { configureStore } from '@reduxjs/toolkit'
import { brandsVehicleApi } from './apis'
import { authApi } from './apis/authApi'
import { authSlice, uiSlice } from './slices'



export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    // endpoints
    [brandsVehicleApi.reducerPath]: brandsVehicleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      [
        brandsVehicleApi.middleware,
        authApi.middleware
      ])
})

//  for refetchOnFocus/refetchOnReconnect behaviors
// setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch