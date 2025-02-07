import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES, USER_ROLES } from '../routing/routes';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ 
    children, 
    allowedRoles = [USER_ROLES.STUDENT, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN], 
    redirectPath = ROUTES.COMMON.LOGIN 
}) => {
    const location = useLocation();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // Not authenticated
    if (!isAuthenticated) {
        return <Navigate 
            to={redirectPath} 
            state={{ from: location }} 
            replace 
        />;
    }

    // Check user role
    if (!allowedRoles.includes(user?.role)) {
        // Redirect to unauthorized page or dashboard based on user's role
        switch(user?.role) {
            case USER_ROLES.STUDENT:
                return <Navigate to={ROUTES.STUDENT.DASHBOARD} replace />;
            case USER_ROLES.ADMIN:
                return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
            default:
                return <Navigate to={ROUTES.COMMON.HOME} replace />;
        }
    }

    // Check email verification if required
    if (!user?.isVerified) {
        return <Navigate 
            to="/verify-email" 
            state={{ from: location }} 
            replace 
        />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
    redirectPath: PropTypes.string
};

export default ProtectedRoute;