// import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ 
    allowedRoles = [], 
    redirectPath = '/login' 
    }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Render child routes if authenticated and authorized
    return <Outlet />;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    redirectPath: PropTypes.string.isRequired,
};

export const StudentProtectedRoute = () => (
    <ProtectedRoute allowedRoles={['student']} redirectPath="/student/login" />
);

export const AdminProtectedRoute = () => (
    <ProtectedRoute allowedRoles={['admin']} redirectPath="/admin/login" />
);

export default ProtectedRoute;