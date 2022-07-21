import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { IndexPage } from '../rentcarapp/pages/IndexPage';

// import { LoginPage } from '../auth';
// import { CalendarPage } from '../calendar';

const IndexPage = lazy(() => import('../rentcarapp/pages/IndexPage'))
const IndexBackOfficePage = lazy(() => import('../backoffice/pages/IndexBackOfficePage'))

export const AppRouter = () => {

    const authStatus = 'authenticated'; // 'authenticated'; // 'not-authenticated';


    return (
        <Routes>
            {
                // ( authStatus === 'not-authenticated')  
                // ? <Route path="/auth/*" element={ <LoginPage /> } />
                // : <Route path="/*" element={ <IndexPage /> } />
            }
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