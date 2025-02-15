import { lazy } from 'react'; 

const AdminHome = lazy(() => import('../../modules/public-user/adPublic/pages/InstructorHome'));

export const AdminPublicRoutes = [
    {
        index: true,
        element: <AdminHome />
    }
];

