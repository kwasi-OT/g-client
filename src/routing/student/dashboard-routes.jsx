import { Route } from 'react-router-dom';
import Dashboard from '../../modules/student/pages/Dashboard';
// import Profile from '../../modules/student/pages/Profile';

const StudentDashboardRoutes = (
    <>
        <Route index element={<Dashboard />} />
        {/* <Route path="profile" element={<Profile />} /> */}
    </>
);

export default StudentDashboardRoutes;