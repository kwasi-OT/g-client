
import { Route } from 'react-router-dom';
import Home from '../modules/public-user/Home';
import AdminHome from '../modules/public-user/adPublic/pages/AdminHome';
import Page404 from '../modules/public-user/Page404';
import UnAuthorizedPage from '../modules/public-user/UnAuthorizedPage';

const PublicRoutes = (
    <>
        <Route index element={<Home />} />
        <Route path="admin" element={<AdminHome />} />
        <Route path="unauthorized" element={<UnAuthorizedPage />} />
        <Route path="*" element={<Page404 />} />
    </>
);

export default PublicRoutes;