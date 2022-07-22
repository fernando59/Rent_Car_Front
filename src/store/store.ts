import { configureStore } from '@reduxjs/toolkit'
import { brandsVehicleApi } from './apis'
import { authSlice } from './slices/auth/authSlice'
import { uiSlice } from './slices/ui/uiSlice'

export const store = configureStore({
  reducer: {
    ui:uiSlice.reducer,
    auth:authSlice.reducer,
    // endpoints
    [brandsVehicleApi.reducerPath]:brandsVehicleApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
  .concat(brandsVehicleApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch