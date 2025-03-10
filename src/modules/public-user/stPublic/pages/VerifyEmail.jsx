// import { useEffect, useState } from 'react';
// import { supabase } from '../../../../server/supabaseClient';
// import { useNavigate } from 'react-router-dom';
// import { ROUTES } from '../../../../routing/routes';
// import { toast } from 'react-toastify';
import Header from '../../../public-user/stPublic/components/Header';
import Footer from '../../../public-user/stPublic/components/Footer';
const VerifyEmail = () => {
//     const [navigated, setNavigated] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//             setLoading(false);
//             if (event === 'SIGNED_IN' && session) {
//                 // If the user session exists, show success toast and navigate
//                 toast.success('Email verified successfully!');
//                 setNavigated(true);
//                 setTimeout(() => {
//                     navigate(ROUTES.STUDENT.STONBOARDING);
//                 }, 1000); // 1 second delay
//                 // navigate(ROUTES.STUDENT.STONBOARDING); // Redirect to the onboarding page
//                 console.log('navigation:', '/student/onboarding')
//                 console.log('Auth event:', event);
// console.log('Session:', session);
//             } else if (event === 'SIGNED_OUT'){
//                 // Handle cases where the user is not logged in
//                 toast.error('Verification failed. Please try again.');
//                 navigate(ROUTES.COMMON.STAUTH); // Redirect to signup
//             }
//         });

//         // Cleanup subscription on unmount
//         return () => {
//             authListener.subscription.unsubscribe();
//         };
//     }, [navigate]);

//     if (navigated) {
//         return null;
//     }

    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <Header />
            <p>Verifying your email...</p>
            <Footer />
        </div>
    );
};

export default VerifyEmail;