import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../../../server/supabaseClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routing/routes';
import { Blocks } from 'react-loader-spinner';
import { HiOutlineUser } from "react-icons/hi";
import { MdError } from "react-icons/md";

const OnBoarding = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
        

    const onSubmit = async () => {
        setLoading(true);

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
            toast.error('Error fetching user: ' + userError.message);
            setLoading(false);
            return;
        } 

        // Check if the user already exists in the users table
        const { data: existingUser, error: existingUserError } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

        if (existingUserError && existingUserError.code !== 'PGRST116') { // Ignore not found error
            toast.error('Error checking existing user: ' + existingUserError.message);
            setLoading(false);
            return;
        }

        if (existingUser) {
            // User already exists, handle accordingly (e.g., update or skip)
            toast.info('User already exists. Proceeding with existing user.');
        } else {
            // Insert the new user record
            const { error } = await supabase.from('users').insert([
                {
                    auth_id: user.id,
                    email: user.email,
                    first_name: firstName,
                    last_name: lastName,
                    role: 'instructor',
                },
            ]);

            if (error) {
                toast.error('Failed to create user record: ' + error.message);
                console.error('Insert error:', error);
                setLoading(false);
                return;
            } else {
                toast.success('Onboarding completed successfully!');
                navigate(ROUTES.INSTRUCTOR.DASHBOARD);
        
            }
            navigate(ROUTES.INSTRUCTOR.DASHBOARD);
        }
        setLoading(false);
    };

    // load toast on page load
    useEffect(() => {
        toast.success('Email verification completed successfully!');
    }, []);

    return (
        <div className="onboarding-container w-full h-full pb-[3rem] flex items-center justify-center bg-[var(--primary-grey)]">
            <div className='w-[80%] mx-auto flex flex-col items-center justify-center gap-[2rem] mt-[2rem] bg-[var(--bg-white)] rounded-[0.3rem] px-[1rem] pt-[1.5rem] pb-[3rem]'>
                <h2 className="text-[1.5rem] font-bold mb-[1rem]">Complete Your Onboarding</h2>
                <div className="w-[90%] flex flex-col gap-[1rem]">
                    <p>Welcome and thank you for signing up! </p>
                    <p>Please complete your on-boarding to continue to your dashboard.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] flex flex-col gap-[3rem]">
                    <div className="w-full flex items-center justify-between ">
                            <div className="firstname w-[45%] flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                                <HiOutlineUser color="#3f3f3f" size={22}/>
                                <input
                                {...register('firstName', 
                                    { required: true })
                            }
                            onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className="w-[90%] bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                            />
                            {errors.firstName && <MdError color="var(--primary-red)" size={22}/>}
                        </div>
                        <div className="lastname w-[45%] flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                            <HiOutlineUser color="#3f3f3f" size={22}/>
                            <input
                                {...register('lastName', { required: true })}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="w-[90%] bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                            />
                            {errors.lastName && <MdError color="var(--primary-red)" size={22}/>}
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-[100%] h-[3rem] rounded-[0.3rem] bg-[var(--primary-blue)] hover:bg-[var(--logo-blue)] text-[var(--bg-white)] flex items-center justify-center gap-[0.5rem]">
                        {loading ? <Blocks color="#000" height={20} width={20} /> : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OnBoarding;