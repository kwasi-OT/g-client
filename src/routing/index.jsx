import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

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
import { StudentPublicRoutes } from './student/public-routes';
import { StudentDashboardRoutes } from './student/dashboard-routes';
import { AdminPublicRoutes } from './admin/public-routes';
import { AdminDashboardRoutes } from './admin/dashboard-routes';

// User Roles
import { USER_ROLES } from './routes';

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
                    ...StudentPublicRoutes,
                    ...StudentDashboardRoutes.map(route => ({
                        ...route,
                        element: (
                            <Suspense fallback={<Blocks
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                visible={true} />}
                            >
                                {route.element}
                            </Suspense>
                        )
                    }))
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
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
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
                element: <Navigate to="/" replace />
            }
        ]
    }
]);

export default router;