import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { BrandPage } from '../backoffice/pages/BrandPage';
import { ClientsPage } from '../backoffice/pages/ClientsPage';
import { DashBoardPage } from '../backoffice/pages/DashBoardPage';
import IndexBackOfficePage from '../backoffice/pages/IndexBackOfficePage';
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
import { PrivateRouteAdmin } from './PrivateRouteAdmin';
import { PrivateRouteClient } from './PrivateRouteClient';
// import { IndexPage } from '../rentcarapp/pages/IndexPage';

// import { LoginPage } from '../auth';
// import { CalendarPage } from '../calendar';


export const AppRouter = () => {

    const { status, user } = useAuthStore();
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(checkingCredentials())
    })
    return (
        <Routes>



            <Route path="/" element={<WelcomePage />} />
            <Route path="vehicleDetail/:id" element={<VehicleDetailPage />} />
            <Route path="vehicleModel" element={<VehicleModelsPage />} />
            <Route element={<PrivateRouteClient />} >
                <Route path='history' element={<HistoryPage />} />
            </Route>



            <Route path="/backoffice/login" element={<LoginBackofficePage />} />
            <Route element={<PrivateRouteAdmin />}>
                <Route path="/backoffice/*" element={<IndexBackOfficePage />} >
                    <Route path="" element={<DashBoardPage />} />
                    <Route path="brands" element={<BrandPage />} />
                    <Route path="vehicles" element={<VehiclePage />} />
                    <Route path="orders" element={<OrderPage />} />
                    <Route path="clients" element={<ClientsPage />} />
                    <Route path="typeVehicle" element={<TypeVehiclePage />} />
                    <Route path="models" element={<ModelPage />} />
                </Route>

            </Route>

        </Routes >
    )
}