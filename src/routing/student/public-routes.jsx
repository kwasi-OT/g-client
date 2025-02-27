import { lazy } from 'react';

const StudentHome = lazy(() => import('../../modules/public-user/stPublic/pages/StudentHome'));
const Login = lazy(() => import('../../modules/public-user/stPublic/components/StudentLoginForm'));
const Signup = lazy(() => import('../../modules/public-user/stPublic/components/StudentSignupForm'));

export const StudentPublicRoutes = [
    {
        index: true,
        element: <StudentHome />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'signup',
        element: <Signup />
    },
    
];