import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserRole } from '../store/slices/authSlice';
import { ROUTES, USER_ROLES } from '../routing/routes';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ 
    children, 
    allowedRoles = [USER_ROLES.STUDENT, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN], 
    redirectPath = ROUTES.COMMON.UNAUTHORIZED 
}) => {
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Retrieve user from localStorage with error handling
    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            return null;
        }
    })();

    // Automatically assign student role if not present
    useEffect(() => {
        if (isAuthenticated && user && !user?.role) {
            const determinedRole = determineUserRole(user);
            dispatch(setUserRole(determinedRole));

            console.log('Automatically assigned user role:', determinedRole);
        }
    }, [isAuthenticated, user, dispatch]);

    // Role determination function
    const determineUserRole = (userData) => {
        if (userData.email.includes('@student.')) {
            return USER_ROLES.STUDENT;
        }
        if (userData.email.includes('@admin.')) {
            return USER_ROLES.ADMIN;
        }
        return USER_ROLES.STUDENT;
    };

    console.log('Protected Route Checks:', {
        isAuthenticated,
        user,
        userRole: user?.role
    });

    // Not authenticated
    if (!isAuthenticated || !user) {
        return <Navigate 
            to={redirectPath} 
            state={{ from: location }} 
            replace 
        />;
    }

    // Check user role
    const hasAllowedRole = allowedRoles.includes(user?.role);

    if (!hasAllowedRole) {
        console.warn('Unauthorized role access attempt', {
            userRole: user.role,
            allowedRoles
        });
        return <Navigate 
            to={ROUTES.COMMON.UNAUTHORIZED} 
            replace 
        />;
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