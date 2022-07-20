import { Route, Routes } from 'react-router-dom';
import { IndexBackOfficePage } from '../backoffice/pages/IndexBackOfficePage';
import { IndexPage } from '../rentcarapp/page/IndexPage';

// import { LoginPage } from '../auth';
// import { CalendarPage } from '../calendar';


export const AppRouter = () => {

    const authStatus = 'authenticated'; // 'authenticated'; // 'not-authenticated';


    return (
        <Routes>
            {
                // ( authStatus === 'not-authenticated')  
                // ? <Route path="/auth/*" element={ <LoginPage /> } />
                // : <Route path="/*" element={ <IndexPage /> } />
            }
            <Route path="/" element={<IndexPage />} />
            <Route path="/backoffice" element={<IndexBackOfficePage />} />

            {/* <Route path="/*" element={<Navigate to="/auth/login" />} /> */}
        </Routes>
    )
}