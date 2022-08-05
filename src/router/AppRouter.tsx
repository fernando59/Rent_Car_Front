import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BrandPage } from '../backoffice/pages/BrandPage';
import { ClientsPage } from '../backoffice/pages/ClientsPage';
import { DashBoardPage } from '../backoffice/pages/DashBoardPage';
import { LoginBackofficePage } from '../backoffice/pages/LoginBackofficePage';
import { ModelPage } from '../backoffice/pages/ModelPage';
import { OrderPage } from '../backoffice/pages/OrderPage';
import { TypeVehiclePage } from '../backoffice/pages/TypeVehiclePage';
import { VehiclePage } from '../backoffice/pages/VehiclePage';
import { useAuthStore } from '../hooks/useAuthStore';
import { HistoryPage } from '../rentcarapp/pages/HistoryPage';
import { VehicleDetailPage } from '../rentcarapp/pages/VehicleDetailPage';
import { VehicleModelsPage } from '../rentcarapp/pages/VehicleModelsPage';
import { WelcomePage } from '../rentcarapp/pages/WelcomePage';
import { checkingCredentials } from '../store/slices';
import { PrivateRouteClient } from './PrivateRouteClient';
// import { IndexPage } from '../rentcarapp/pages/IndexPage';

// import { LoginPage } from '../auth';
// import { CalendarPage } from '../calendar';

const IndexPage = lazy(() => import('../rentcarapp/pages/IndexPage'))
const IndexBackOfficePage = lazy(() => import('../backoffice/pages/IndexBackOfficePage'))

export const AppRouter = () => {

    const { status, user } = useAuthStore();
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(checkingCredentials())
    })
    return (
        <Routes>

            {/* {
                status === 'not-authenticated' ?
                    <>
                        <Route path="/auth/*" element={<LoginPage />} />
                        <Route path="/*" element={<Navigate to="/auth/login" />} />
                    </>
            } */}

            {/* ROUTE APP */}
            <Route path="/*" element={
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <IndexPage />
                </Suspense>}
            >
                <Route path="" element={<WelcomePage />} />
                <Route path="vehicleDetail/:id" element={<VehicleDetailPage />} />
                <Route path="vehicleModel" element={<VehicleModelsPage />} />
                {/* {
                    status === 'authenticated' && user.rols === 'Client' ? <>
                        <Route path="history" element={<HistoryPage />} /> </> :
                        <Route path='/*' element={<Navigate to=""  />} />

                } */}
                <Route path='' element={
                    <PrivateRouteClient>
                        <Route path="history" element={<HistoryPage />} />
                    </PrivateRouteClient>
                } />

            </Route>



            {/* ROUTE BACKOFFICE */}
            {
                status === 'not-authenticated' && <Route path="/backoffice/login" element={<LoginBackofficePage />} />
            }

            <Route path="/backoffice/*" element={<Suspense fallback={<h1>Loading ...</h1>}> <IndexBackOfficePage /> </Suspense>} >
                {
                    status === 'authenticated' && user.rols === 'Admin' ? <>
                        <Route path="" element={<DashBoardPage />} />
                        <Route path="brands" element={<BrandPage />} />
                        <Route path="vehicles" element={<VehiclePage />} />
                        <Route path="orders" element={<OrderPage />} />
                        <Route path="clients" element={<ClientsPage />} />
                        <Route path="typeVehicle" element={<TypeVehiclePage />} />
                        <Route path="models" element={<ModelPage />} />

                    </> : <Route path='*' element={<Navigate to="/backoffice/login" replace={true} />} />
                }
            </Route>

            {/* <Route path="/*" element={<Navigate to="/" />} /> */}
        </Routes >
    )
}