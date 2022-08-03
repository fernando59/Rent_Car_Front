import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrandPage } from '../backoffice/pages/BrandPage';
import { ClientsPage } from '../backoffice/pages/ClientsPage';
import { DashBoardPage } from '../backoffice/pages/DashBoardPage';
import { ModelPage } from '../backoffice/pages/ModelPage';
import { OrderPage } from '../backoffice/pages/OrderPage';
import { TypeVehiclePage } from '../backoffice/pages/TypeVehiclePage';
import { VehiclePage } from '../backoffice/pages/VehiclePage';
import { useAuthStore } from '../hooks/useAuthStore';
import { HistoryPage } from '../rentcarapp/pages/HistoryPage';
import { VehicleDetailPage } from '../rentcarapp/pages/VehicleDetailPage';
import { VehicleModelsPage } from '../rentcarapp/pages/VehicleModelsPage';
import { WelcomePage } from '../rentcarapp/pages/WelcomePage';
// import { IndexPage } from '../rentcarapp/pages/IndexPage';

// import { LoginPage } from '../auth';
// import { CalendarPage } from '../calendar';

const IndexPage = lazy(() => import('../rentcarapp/pages/IndexPage'))
const IndexBackOfficePage = lazy(() => import('../backoffice/pages/IndexBackOfficePage'))

export const AppRouter = () => {

    const { status } = useAuthStore();
    console.log(status)


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
                <Route path="" element={<WelcomePage/>} />
                <Route path="vehicleDetail/:id" element={<VehicleDetailPage/>} />
                <Route path="vehicleModel" element={<VehicleModelsPage/>} />
                <Route path="history" element={<HistoryPage/>} />

            </Route>


            
            {/* ROUTE BACKOFFICE */}
            <Route path="/backoffice/*" element={ <Suspense fallback={<h1>Loading ...</h1>}> <IndexBackOfficePage /> </Suspense>} >
                <Route path="" element={<DashBoardPage />} />
                <Route path="brands" element={<BrandPage />} />
                <Route path="vehicles" element={<VehiclePage/>} />
                <Route path="orders" element={<OrderPage/>} />
                <Route path="clients" element={<ClientsPage/>} />
                <Route path="typeVehicle" element={<TypeVehiclePage />} />
                <Route path="models" element={<ModelPage />} />
            </Route>
            
            {/* <Route path="/*" element={<Navigate to="/" />} /> */}
        </Routes>
    )
}