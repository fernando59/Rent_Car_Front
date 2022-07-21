import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BrandPage } from '../backoffice/pages/BrandPage';
import { DashBoardPage } from '../backoffice/pages/DashBoardPage';
import { ModelPage } from '../backoffice/pages/ModelPage';
import { TypeVehiclePage } from '../backoffice/pages/TypeVehiclePage';
import { useAuthStore } from '../hooks/useAuthStore';
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
            <Route path="/" element={
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <IndexPage />
                </Suspense>}
            />
            {/* ROUTE BACKOFFICE */}
            <Route path="/backoffice/*" element={ <Suspense fallback={<h1>Loading ...</h1>}> <IndexBackOfficePage /> </Suspense>} >
                <Route path="" element={<DashBoardPage />} />
                <Route path="brands" element={<BrandPage />} />
                <Route path="typeVehicle" element={<TypeVehiclePage />} />
                <Route path="models" element={<ModelPage />} />
            </Route>
            
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}