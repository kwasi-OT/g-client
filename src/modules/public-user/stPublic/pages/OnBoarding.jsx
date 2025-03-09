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
    const [preferredCourses, setPreferredCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    // fetch the user
    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                toast.error('Error fetching user: ' + error.message);
            } else {
                setUser(data);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        // Fetch available courses from the sub_categories table
        const fetchCourses = async () => {
            const { data, error } = await supabase.from('sub_categories').select('*');
            if (error) {
                toast.error('Error fetching courses: ' + error.message);
            } else {
                setAllCourses(data);
            }
        };

        fetchCourses();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        const { firstName, lastName, preferredCourses } = data;
        const user = supabase.auth.user(); // Get the authenticated user

        // Insert the user details into the users table
        const { error } = await supabase.from('users').insert([
            {
                auth_id: user.id,
                email: user.email,
                first_name: firstName,
                last_name: lastName,
                role: 'student',
            },
        ]);

        if (error) {
            toast.error('Failed to create user record: ' + error.message);
            console.error('Insert error:', error);
        } else {
            // Insert preferred courses into user_preferred_courses table
            const preferredCourseInserts = preferredCourses.map(courseId => ({
                user_id: user.id,
                course_id: courseId,
            }));

            const { error: courseError } = await supabase.from('user_preferred_courses').insert(preferredCourseInserts);
            if (courseError) {
                toast.error('Failed to save preferred courses: ' + courseError.message);
                console.error('Course insert error:', courseError);
            } else {
                toast.success('Onboarding completed successfully!');
                navigate(ROUTES.STUDENT.DASHBOARD); // Redirect to the dashboard or appropriate page
            }
        }
        setLoading(false);
        handlePreferredCourses();
    };

    // handle preferred courses selection
    const handlePreferredCourses = () => {
        if (preferredCourses.length === 0) {
            toast.error('Please select at least one preferred course');
        }
    }

    return (
        <div className="onboarding-container">
            <div className='w-[80%] mx-auto flex flex-col items-center justify-center gap-[2rem] mt-[2rem]'>
                <h2 className="text-[1.5rem] font-bold mb-[1rem]">Complete Your Onboarding</h2>
                {user && (
                    <div className="w-[90%] flex flex-col gap-[1rem]">
                        <p>Welcome! {user.first_name} {user.last_name} and thank you for signing up! </p>
                        <p>Please complete your on-boarding to continue to your dashboard.</p>
                    </div>
                )}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] flex flex-col gap-[1rem]">
                        <div className="w-full flex items-center justify-between ">
                            <div className="firstname w-[45%] flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                                <HiOutlineUser color="#3f3f3f" size={22}/>
                                <input
                                {...register('firstName', { required: true })}
                                placeholder="First Name"
                                className="w-[90%] bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                            />
                            {errors.firstName && <MdError color="var(--primary-red)" size={22}/>}
                        </div>
                        <div className="lastname w-[45%] flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                            <HiOutlineUser color="#3f3f3f" size={22}/>
                            <input
                                {...register('lastName', { required: true })}
                                placeholder="Last Name"
                                className="w-[90%] bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                            />
                            {errors.lastName && <MdError color="var(--primary-red)" size={22}/>}
                        </div>
                    </div>
                    <div className="w-[98.3%] flex items-center gap-[0.5rem] bg-[var(--bg-white)] border-[1px] border-[var(--primary-blue)] rounded-[0.3rem] p-[0.5rem]">
                        <select multiple className="w-full h-[10rem] bg-[var(--bg-white)] border-none outline-none text-[1rem] text-[var(--primary-black)]" onChange={(e) => setPreferredCourses([...e.target.selectedOptions].map(option => option.value))}>
                            {allCourses.map(course => (
                                <option className="p-[0.4rem]" key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
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