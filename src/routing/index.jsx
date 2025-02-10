import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layouts
import RootLayout from '../layouts/RootLayout';
// import StudentPublicLayout from '../layouts/student/PublicLayout';
import StudentDashboardLayout from '../layouts/student/DashboardLayout';
import AdminDashboardLayout from '../layouts/admin/DashboardLayout';

// Route Components
import { Blocks } from 'react-loader-spinner'

// Protected Routes
import ProtectedRoute from './protected-routes';

// Public Routes
import { PublicRoutes } from './public-routes';

// Module-specific Routes
// import { StudentPublicRoutes } from './student/public-routes';
// import { StudentDashboardRoutes } from './student/dashboard-routes';
import { AdminPublicRoutes } from './admin/public-routes';
import { AdminDashboardRoutes } from './admin/dashboard-routes';

// User Roles
import { USER_ROLES, ROUTES } from './routes';
const Dashboard = lazy(() => import('../modules/student/pages/Dashboard'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            ...PublicRoutes,
            {
                path: 'student',
                element: (
                    <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                        <StudentDashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: 'dashboard',
                        element: (
                            <Suspense fallback={
                                <Blocks
                                    height="80"
                                    width="80"
                                    color="#4fa94d"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{ 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        height: '100vh' 
                                    }}
                                    wrapperClass="flex justify-center items-center h-screen"
                                    visible={true} 
                                />
                            }>
                                <Dashboard />
                            </Suspense>
                        )
                    }
                ]
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN]}>
                        <AdminDashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    ...AdminPublicRoutes,
                    ...AdminDashboardRoutes.map(route => ({
                        ...route,
                        element: (
                            <Suspense fallback={<Blocks
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}
                                wrapperClass="flex justify-center items-center h-screen"
                                visible={true} />}
                            >
                                {route.element}
                            </Suspense>
                        )
                    }))
                ]
            },
            {
                path: '*',
                element: <Navigate to={ROUTES.COMMON.HOME} replace />
            }
        ]
    }
]);

export default router;