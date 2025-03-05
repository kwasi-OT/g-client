import { lazy } from 'react';

const InstAuth = lazy(() => import('../modules/public-user/adPublic/pages/InstAuth'));
const Home = lazy(() => import('../modules/public-user/Home'));
const Instructor = lazy(() => import('../modules/public-user/adPublic/pages/Home'));
const OtpPage = lazy(() => import('../modules/public-user/adPublic/pages/OtpPage'));
const Page404 = lazy(() => import('../modules/public-user/Page404'));
const CourseListing = lazy(() => import('../modules/public-user/stPublic/pages/CourseListing'));
const CourseDetails = lazy(() => import('../modules/public-user/stPublic/pages/CourseDetails'));

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
        path: 'instructor/otp',
        element: <OtpPage />
    },
    {
        path: 'courses/:categoryId',
        element: <CourseListing />
    },
    {
        path: 'course/:courseId',
        element: <CourseDetails />
    },
    {
        path: '*',
        element: <Page404 />
    }
];