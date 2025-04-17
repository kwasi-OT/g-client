import { useState } from 'react';
import { useForm } from 'react-hook-form';
import EmailIcon from '../../../../assets/icons/email.svg';
import PasswordIcon from '../../../../assets/icons/lock.svg';
import { MdChevronRight } from "react-icons/md";
import { MdError } from "react-icons/md";
import ForgotPassword from "./ForgotPassword";
import PropTypes from 'prop-types';
import { supabase } from '../../../../server/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Blocks } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../../routing/routes';

const StudentLoginForm = ({ toggleAuthView }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


    // handle form submission
    const onSubmit = async (data) => {
        setIsLoading(true);
        const { email, password } = data;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            toast.error('Login failed: ' + error.message);
            console.error('Login error:', error);
        } else {
            toast.success('Login successful!');
            navigate(ROUTES.STUDENT.DASHBOARD);
        }
        setIsLoading(false);
    };

    // toggle forgot password
    const toggleForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    }
    return (
        <>
            {showForgotPassword ? 
                (
                    <ForgotPassword />
                ) : (
                    <div className="w-100% h-fit flex flex-col items-center justify-center">
                        <h2>Login</h2>
                        {/* <div className="w-full flex items-center justify-center gap-[0.5rem] border border-[var(--primary-blue)] rounded-[0.3rem] cursor-pointer">
                            <FcGoogle />
                            <p className="text-[0.7rem] font-[600] text-[var(--primary-blue)]">Log in using Google</p>
                        </div>
                        <div className="flex items-center gap-[0.5rem]">
                            <p>Or</p>
                        </div> */}
                        <form className="w-full flex flex-col gap-[1rem]" onSubmit={handleSubmit(onSubmit)}>
                            <div className='w-full flex items-center gap-[0.5rem] bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[var(--primary-blue)] active:bg-[var(--input-active-bg)] box-border rounded-[0.3rem]'>
                                <div className="w-full py-[0.2rem] px-[0.5rem]  flex items-center gap-[0.5rem] bg-[var(--input-bg)]">
                                    <img src={EmailIcon} alt="email icon" />
                                    <input 
                                        type='email' 
                                        placeholder='Email'
                                        {...register("email", { required: true })}
                                        className="w-full bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                                    />
                                </div>
                                {errors.email && <MdError color="var(--primary-red)" size={22}/>}
                            </div>
                            <div className='w-full flex items-center gap-[0.5rem] rounded-[0.3rem] flex items-center gap-[0.5rem] bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[var(--primary-blue)] active:bg-[var(--input-active-bg)] box-border'>
                                <div className="w-full py-[0.2rem] px-[0.5rem]  flex items-center gap-[0.5rem] bg-[var(--input-bg)]">
                                    <img src={PasswordIcon} alt="password icon" />
                                    <input 
                                        type='password' 
                                        placeholder='Password' 
                                        {...register("password", { required: true })}
                                        className="w-full bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                                    />
                                </div>
                                {errors.password && <MdError color="var(--primary-red)" size={22}/>}
                            </div>
                            <p className="text-[0.7rem] font-[600] text-[var(--primary-blue)] cursor-pointer hover:underline" onClick={toggleForgotPassword}>
                                Forgot password?
                            </p>
                            <button className="w-full flex items-center justify-center gap-[0.5rem] bg-[var(--primary-blue)] text-[var(--bg-white)] py-[0.5rem] rounded-[0.3rem]" 
                            type='submit'
                            aria-busy={isLoading}
                            aria-label={isLoading ? "Logging in..." : "Login"}
                            disabled={isLoading}
                            >
                                {isLoading ? 
                                    (<Blocks
                                        height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
                                wrapperClass="flex justify-center items-center h-[100%]"
                                    />
                                ):(
                                    <>
                                        Login
                                        <MdChevronRight color="var(--bg-white)" size={25}/>
                                    </>
                                )}
                            </button>
                            <p>
                                Need to create an account ? 
                                <span className='text-[var(--primary-blue)] cursor-pointer' onClick={toggleAuthView}> signup</span>
                            </p>
                        </form>
                    </div>
                )
            }
            {
                isLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900 h-12 w-12"></div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

StudentLoginForm.propTypes = {
    toggleAuthView: PropTypes.func
}

export default StudentLoginForm
