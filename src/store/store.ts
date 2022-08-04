import { configureStore } from '@reduxjs/toolkit'
import { brandsVehicleApi, orderApi } from './apis'
import { authApi } from './apis/authApi'
import { modelVehicleApi } from './apis/modelVehicleApi'
import { typeVehicleApi } from './apis/typeVehicleApi'
import { vehicleApi } from './apis/vehicleApi'
import { authSlice, uiSlice, vehicleSlice } from './slices'



export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    vehicle:vehicleSlice.reducer,
    // endpoints
    [brandsVehicleApi.reducerPath]: brandsVehicleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [modelVehicleApi.reducerPath]: modelVehicleApi.reducer,
    [typeVehicleApi.reducerPath]: typeVehicleApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      [
        brandsVehicleApi.middleware,
        authApi.middleware,
        vehicleApi.middleware,
        modelVehicleApi.middleware,
        typeVehicleApi.middleware,
        orderApi.middleware,
        
      ])
})

//  for refetchOnFocus/refetchOnReconnect behaviors
// setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch