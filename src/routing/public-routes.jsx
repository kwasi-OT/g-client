import { lazy } from 'react';

const InstAuth = lazy(() => import('../modules/public-user/adPublic/pages/InstAuth'));
const Home = lazy(() => import('../modules/public-user/Home'));
const Instructor = lazy(() => import('../modules/public-user/adPublic/pages/Home'));
const Page404 = lazy(() => import('../modules/public-user/Page404'));

export const PublicRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: 'instructor',
        element: <Instructor />
    },
    {
        path: 'instructor/auth',
        element: <InstAuth />
    },
    {
        path: '*',
        element: <Page404 />
    }
];