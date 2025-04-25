import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../server/supabaseClient';
import { ROUTES, USER_ROLES } from '../routing/routes';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ 
    children, 
    allowedRoles = [USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.SUPER_ADMIN], 
    redirectPath = ROUTES.COMMON.UNAUTHORIZED 
}) => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
                return;
            }
            setUser(user);
            // console.log('Fetched user:', user);

            // Fetch user data from the users table if user exists
            if (user) {
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('auth_id', user.id)
                    .single();

                if (userError) {
                    console.error('Error fetching user data:', userError);
                    setLoading(false);
                    return;
                }

                setUserRole(userData.role);
                // console.log('Fetched user data:', userData);
                // console.log('Fetched user role:', userData.role);
            }
            setLoading(false);
        };

        fetchAuthUser();
    }, []);

    // Loading state
    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    // Not authenticated
    if (!user) {
        return <Navigate 
            to={redirectPath} 
            state={{ from: location }} 
            replace 
        />;
    }

    // Check user role
    const hasAllowedRole = allowedRoles.includes(userRole);

    if (!hasAllowedRole) {
        console.warn('Unauthorized role access attempt', {
            userRole,
            allowedRoles
        });
        return <Navigate 
            to={ROUTES.COMMON.UNAUTHORIZED} 
            replace 
        />;
    }

    // Check email verification
    if (!user.email_confirmed_at) { // Assuming this field indicates verification
        return <Navigate 
            to={ROUTES.COMMON.STVERIFY_EMAIL} 
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