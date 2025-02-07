import { lazy } from 'react'; 

const AdminHome = lazy(() => import('../../modules/public-user/adPublic/pages/AdminHome'));

export const AdminPublicRoutes = [
    {
        index: true,
        element: <AdminHome />
    }
];

