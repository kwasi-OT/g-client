import { useState } from 'react';
import { useForm } from "react-hook-form"
import { ROUTES } from "../../../../routing/routes";
import { useNavigate } from "react-router-dom";
import EmailIcon from '../../../../assets/icons/email.svg';
import PasswordIcon from '../../../../assets/icons/lock.svg';
import { MdChevronRight } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { MdError } from "react-icons/md";
import { Blocks } from "react-loader-spinner";
import { supabase } from "../../../../server/supabaseClient";
import { toast } from "react-toastify"

const InstSignup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // handle submit
    const handleSignup = async (data) => {
        setLoading(true);
        const { email, password, firstName, lastName } = data;
    
        // Sign up the user with Supabase
        const { user, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'https://gclient-lilac.vercel.app/instructor/verify-email'
            }
        });
    
        if (signUpError) {
            toast.error('Signup failed: ' + signUpError.message);
            console.error('Signup error:', signUpError);
            setLoading(false);
            return;
        }
    
        // Create a record in the users table
        const { error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    auth_id: user.id, // Link to the Supabase user ID
                    email: user.email,
                    first_name: firstName,
                    last_name: lastName,
                    role: 'instructor'
                },
            ]);
    
        if (insertError) {
            toast.error('Failed to create user record: ' + insertError.message);
            console.error('Insert error:', insertError);
        } else {
            toast.success('Signup successful!');
            localStorage.setItem('formData', JSON.stringify(data));
            navigate(ROUTES.COMMON.INSTVERIFY_EMAIL); // Redirect to verification page
        }
    
        setLoading(false);
    };



    // const handleSignup = async (data) => {
    //     setLoading(true);

    //     const {email, password, firstName, lastName} = data;
    //     const { error } = await supabase.auth.signUp({
    //         email,
    //         password,
    //         options: {
    //             data: {
    //                 first_name: firstName,
    //                 last_name: lastName,
    //                 role: 'instructor'
    //             }
    //         }
    //     })

    //     if (error) {
    //         toast.error('Signup failed');
    //         console.error(error);
    //     } else {
    //         toast.success('Signup was succssful');
    //         // store in local storage
    //         localStorage.setItem('formData', JSON.stringify(data));
    //         // navigate to otp page
    //         navigate(ROUTES.COMMON.INSTVERIFY_EMAIL);
    //     }
    //     setLoading(false);
    //     return data;
    // }

    return (
        <div className="w-[70%] h-[30%] flex flex-col gap-[1rem] mt-[-2rem]">
            <h1 className="text-[2rem] font-[700] leading-[3rem]">Register to get started</h1>
            <form onSubmit={handleSubmit(handleSignup)} className="w-full ">
                <div className="form-container w-full flex flex-col items-center justify-center gap-[2rem]">
                    <div className="names w-[95%] flex items-center justify-between ">
                        <div className="firstname w-[45%] h-[3rem] flex flex-col">
                            <div className="firstname w-full flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                                <HiOutlineUser color="#3f3f3f" size={22}/>
                                <input 
                                    {...register("firstname", { required: true })} placeholder="First Name"
                                    className="w-[90%] bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                                />  
                                {errors.firstname && <MdError color="var(--primary-red)" size={22}/>}
                            </div>
                            {errors.firstname && <p className='error-message text-[0.7rem] text-[var(--primary-red)]'>First Name is required</p>}
                        </div>
                        <div className="lastname w-[45%] h-[3rem] flex flex-col">
                            <div className="lastname w-full flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                                <HiOutlineUser color="#3f3f3f" size={22}/>
                                <input 
                                    {...register("lastname", { required: true })} placeholder="Last Name"
                                    className="w-[90%] bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                                />
                                {errors.lastname && <MdError color="var(--primary-red)" size={22}/>}
                            </div>
                            {errors.lastname && <p className='error-message text-[0.7rem] text-[var(--primary-red)]'>Last Name is required</p>}
                        </div>
                    </div>
                    <div className="w-[95%] h-[3rem] flex flex-col">
                        <div className="email w-full flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                            <img src={EmailIcon} alt="email" />
                            <input 
                                {...register("email", { required: true })} 
                                placeholder="Email"
                                className="w-full bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                            />
                            {errors.email && <MdError color="var(--primary-red)" size={22}/>}
                        </div>
                        {errors.email && <p className='error-message text-[0.7rem] text-[var(--primary-red)]'>Email is required</p>}
                    </div>
                    <div className="password w-[95%] flex items-center justify-between gap-[0.5rem]">
                        <div className="w-[45%] h-[3rem] flex flex-col">
                            <div className="password-field w-full flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                                <img src={PasswordIcon} alt="password" />
                                <input 
                                    {...register("password", { required: true })} placeholder="Password"
                                    className="w-[90%] bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                                />
                                {errors.password && <MdError color="var(--primary-red)" size={22}/>}
                            </div>
                            {errors.password && <p className='error-message text-[0.7rem] text-[var(--primary-red)]'>Password is required</p>}
                        </div>
                        <div className="w-[45%] h-[3rem] flex flex-col">
                            <div className="confirm-password-field w-full flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                                <img src={PasswordIcon} alt="confirm password" />
                                <input 
                                    {...register("confirmPassword", { required: true })} placeholder="Confirm Password"
                                    className="w-[90%] bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                                />
                                {errors.confirmPassword && <MdError color="var(--primary-red)" size={22}/>}
                            </div>
                            {errors.confirmPassword && <p className='error-message text-[0.7rem] text-[var(--primary-red)]'>Confirm Password is required</p>}
                        </div>
                    </div>
                    <button type="submit" className="w-full h-[3rem] mt-[1rem] rounded-[0.3rem] bg-[var(--primary-blue)] hover:bg-[var(--logo-blue)] text-[var(--bg-white)] flex items-center justify-center gap-[0.5rem]">
                        {loading ? 
                            <Blocks 
                                visible={true} 
                                height={30} 
                                width={30} 
                                ariaLabel="block-loading" 
                            /> 
                            : <>
                                Create account
                                <MdChevronRight color="var(--bg-white)" size={25} />
                            </>
                        }
                    </button>
                </div>
                <div className="tos w-full flex flex-col items-center justify-center">
                    <p className="text-[0.7rem] leading-[1.25rem]">
                        By confirming your email, you agree to our <span className="underline cursor-pointer">Terms of Service</span>
                    </p>
                    <p className="text-[0.7rem] leading-[1.25rem] mt-[-0.7rem]">
                        and that you have read and understood our <span className="underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default InstSignup
