import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../../../server/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Blocks } from 'react-loader-spinner';
import EmailIcon from '../../../../assets/icons/email.svg';
import PasswordIcon from '../../../../assets/icons/lock.svg';
import { MdChevronRight } from "react-icons/md";
import { MdError } from "react-icons/md";
import { ROUTES } from "../../../../routing/routes";
import PropTypes from 'prop-types';

const StudentSignupForm = ({toggleAuthView}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        const { email, password } = data;
    
        // Sign up the user with Supabase
        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:5173/student/onboarding'
            }
        });
    
        if (signUpError) {
            toast.error('Signup failed: ' + signUpError.message);
            console.error('Signup error:', signUpError);
            setLoading(false);
            return;
        } else {
            toast.success('Signup successful!');
            navigate(ROUTES.COMMON.STOTP); // Redirect to verification page
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-[2rem]">
            <div className='cta-container w-[80%] flex items-center justify-end gap-[0.5rem] mb-[1rem]'>
                <p>Already have an account?</p>
                <button type="button" className="w-[25%] h-[3rem] rounded-[0.3rem] bg-[var(--primary-blue)] hover:bg-[var(--logo-blue)] text-[var(--bg-white)] flex items-center justify-center gap-[0.5rem]" onClick={toggleAuthView}>
                    Login 
                    <MdChevronRight size={22}/>
                </button>
            </div>
            <div className="form-container w-[80%] flex flex-col items-center justify-center gap-[2rem]">
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
                    <button type="submit" className="w-full h-[3rem] mt-[1rem] rounded-[0.3rem] bg-[var(--primary-blue)] hover:bg-[var(--logo-blue)] text-[var(--bg-white)] flex items-center justify-center gap-[0.5rem]" disabled={loading}>
                        {loading ? 
                            <Blocks 
                                visible={true} 
                                height={30} 
                                width={30} 
                                ariaLabel="block-loading" 
                            /> 
                            : <>
                                Sign up
                                <MdChevronRight color="var(--bg-white)" size={25} />
                            </>
                        }
                    </button>
                </div>
                <div className="tos w-[80%] flex flex-col items-center justify-center">
                    <p className="text-[0.7rem] leading-[1.25rem]">
                        By confirming your email, you agree to our <span className="underline cursor-pointer">Terms of Service</span>
                    </p>
                    <p className="text-[0.7rem] leading-[1.25rem] mt-[-0.7rem]">
                        and that you have read and understood our <span className="underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
        </form>
    );
};

StudentSignupForm.propTypes = {
    toggleAuthView: PropTypes.func.isRequired
};

export default StudentSignupForm;
