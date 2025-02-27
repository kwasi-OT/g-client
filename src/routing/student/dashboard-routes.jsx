import { lazy } from 'react';

const Dashboard = lazy(() => import('../../modules/student/pages/Dashboard'));
// const Profile = lazy(() => import('../../modules/student/pages/Profile'));

export const StudentDashboardRoutes = [
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    // {
    //     path: 'profile',
    //     element: <Profile />
    // }
];