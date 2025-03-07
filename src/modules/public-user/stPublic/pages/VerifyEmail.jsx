import { useEffect } from 'react';
import { supabase } from '../../../../server/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routing/routes';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleEmailVerification = async () => {
            const { user, error } = await supabase.auth.getUser();

            if (error) {
                toast.error('Verification failed: ' + error.message);
                navigate(ROUTES.COMMON.STAUTH); // Redirect to signup
            } else if (user) {
                toast.success('Email verified successfully!');
                navigate(ROUTES.STUDENT.DASHBOARD); // Redirect to the dashboard 
            }
        };

        handleEmailVerification();
    }, [navigate]);

    return <div className='w-full h-[100vh] flex items-center justify-center'>Verifying your email...</div>;
};

export default VerifyEmail;