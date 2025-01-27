import { Route } from 'react-router-dom';
import Dashboard from '../../modules/admin/pages/Dashboard';
// import Users from '../../modules/admin/pages/Users';

const AdminDashboardRoutes = (
    <>
        <Route path="" element={<Dashboard />} />
        {/* <Route path="users" element={<Users />} /> */}
    </>
);

export default AdminDashboardRoutes;