
import { Route } from 'react-router-dom';
import StudentHome from '../modules/public-user/stPublic/pages/StudentHome';
import AdminHome from '../modules/public-user/adPublic/pages/AdminHome';
import Page404 from '../modules/public-user/Page404';
import UnAuthorizedPage from '../modules/public-user/UnAuthorizedPage';

const PublicRoutes = (
    <>
        <Route path="/" element={<StudentHome />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/unauthorized" element={<UnAuthorizedPage />} />
        <Route path="*" element={<Page404 />} />
    </>
);

export default PublicRoutes;