import { lazy } from 'react'; 

const InstructorHome = lazy(() => import('../../modules/public-user/adPublic/pages/InstructorHome'));

export const AdminPublicRoutes = [
    {
        index: true,
        element: <InstructorHome />
    }
];

