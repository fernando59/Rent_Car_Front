import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
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

            <Route path="/" element={
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <IndexPage />
                </Suspense>}
            />
            <Route path="/backoffice" element={
                <Suspense fallback={<h1>Loading ...</h1>}>
                    <IndexBackOfficePage />
                </Suspense>}
            />

            {/* <Route path="/*" element={<Navigate to="/auth/login" />} /> */}
        </Routes>
    )
}