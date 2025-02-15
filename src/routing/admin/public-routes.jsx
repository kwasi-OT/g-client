import { lazy } from 'react'; 

const InstructorHome = lazy(() => import('../../modules/public-user/adPublic/pages/InstructorHome'));
const PlanCurriculum = lazy(() => import('../../modules/public-user/adPublic/components/PlanCurriculum'));
const RecordVideo = lazy(() => import('../../modules/public-user/adPublic/components/RecordVideo'));
const LaunchCourse = lazy(() => import('../../modules/public-user/adPublic/components/LaunchCourse'));

export const AdminPublicRoutes = [
    {
        index: true,
        element: <InstructorHome />
    },
    {
        path: 'plan',
        element: <PlanCurriculum />
    },
    {
        path: 'record',
        element: <RecordVideo />
    },
    {
        path: 'launch',
        element: <LaunchCourse />
    }
];

