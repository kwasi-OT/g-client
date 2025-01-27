import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    Route
} from 'react-router-dom';

// Layouts
import RootLayout from '../layouts/RootLayout';
import StudentPublicLayout from '../layouts/student/PublicLayout';
import AdminPublicLayout from '../layouts/admin/PublicLayout';
import StudentDashboardLayout from '../layouts/student/DashboardLayout';
import AdminDashboardLayout from '../layouts/admin/DashboardLayout';

// Routes
import PublicRoutes from './public-routes';
import StudentPublicRoutes from './student/public-routes';
import AdminPublicRoutes from './admin/public-routes';
import StudentDashboardRoutes from './student/dashboard-routes';
import AdminDashboardRoutes from './admin/dashboard-routes';

// Protected Route
import { 
    StudentProtectedRoute, 
    AdminProtectedRoute 
} from '../routing/protected-routes';

// Common pages
import Page404 from '../modules/public-user/Page404';
import UnAuthorizedPage from '../modules/public-user/UnAuthorizedPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<PublicRoutes />} />

        {/* Student Public Routes */}
        <Route path="student" element={<StudentPublicLayout />}>
            {StudentPublicRoutes}
        </Route>

        {/* Admin Public Routes */}
        <Route path="admin" element={<AdminPublicLayout />}>
            {AdminPublicRoutes}
        </Route>

        {/* Student Dashboard - Protected */}
        <Route element={<StudentProtectedRoute />}>
            <Route path="student/dashboard" element={<StudentDashboardLayout />}>
            {StudentDashboardRoutes}
            </Route>
        </Route>
        
        {/* Admin Dashboard - Protected */}
        <Route element={<AdminProtectedRoute />}>
            <Route path="admin/dashboard" element={<AdminDashboardLayout />}>
            {AdminDashboardRoutes}
            </Route>
        </Route>

        {/* 404 Page */}
        <Route path="unauthorized" element={<UnAuthorizedPage />} />
        <Route path="*" element={<Page404 />} />
        </Route>
    )
);


export default router;