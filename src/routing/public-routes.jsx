import { lazy } from 'react';

const Home = lazy(() => import('../modules/public-user/Home'));
const Page404 = lazy(() => import('../modules/public-user/Page404'));

export const PublicRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '*',
        element: <Page404 />
    }
];