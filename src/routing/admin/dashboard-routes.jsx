import { lazy } from 'react';

const Dashboard = lazy(() => import('../../modules/admin/pages/Dashboard'));
// const UserManagement = lazy(() => import('../../modules/admin/pages/UserManagement'));

export const AdminDashboardRoutes = [
    {
        path: '/admin/dashboard',
        element: <Dashboard />
    },
    // {
    //     path: 'users',
    //     element: <UserManagement />
    // }
];