import { Route } from 'react-router-dom';
import StudentHome from '../../modules/public-user/stPublic/pages/StudentHome';
import Login from '../../modules/public-user/stPublic/components/StudentLoginForm';
import Signup from '../../modules/public-user/stPublic/components/StudentSignupForm';

const StudentPublicRoutes = (
    <>
        <Route index element={<StudentHome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
    </>
);

export default StudentPublicRoutes;