import { Route } from 'react-router-dom';
import AdminHome from '../../modules/public-user/adPublic/pages/AdminHome';

const AdminPublicRoutes = (
    <>
        <Route index element={<AdminHome />} />
    </>
);

export default AdminPublicRoutes;