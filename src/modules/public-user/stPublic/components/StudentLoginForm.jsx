import { useState } from 'react';
import FormInput from "../../../../utils/FormInput";
import EmailIcon from '../../../../assets/icons/email.svg';
import PasswordIcon from '../../../../assets/icons/lock.svg';
import { MdChevronRight } from "react-icons/md";
import ForgotPassword from "./ForgotPassword";
import PropTypes from 'prop-types';
import { supabase } from '../../../../server/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Blocks } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../../routing/routes';

const StudentLoginForm = ({ toggleAuthView }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    
    // form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Add error display
    {errors && (
        <div className="text-[var(--primary-red)] text-[0.5rem]">
            {errors}
        </div>
    )}


    // handle form submission
    const onSubmit = async (data) => {
        setIsLoading(true);
        const { email, password } = data;

        if(validateForm()) {
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
        }

        setIsLoading(false);
    };

    // handle change event
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
                        <form className="w-full flex flex-col" onSubmit={onSubmit}>
                            <div className='w-full flex flex-col'>
                                <div className="w-full py-[0.2rem] px-[0.5rem] rounded-[0.3rem] flex items-center gap-[0.5rem] bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[var(--primary-blue)] active:bg-[var(--input-active-bg)] box-border">
                                    <img src={EmailIcon} alt="email icon" />
                                    <FormInput 
                                        type='email' 
                                        placeholder='Email'
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        name="email"
                                    />
                                </div>
                                <p className='text-[var(--primary-red)] text-[0.7rem]'>
                                    {errors.email}
                                </p>
                            </div>
                            <div className='w-full flex flex-col'>
                                <div className="w-full py-[0.2rem] px-[0.5rem] rounded-[0.3rem] flex items-center gap-[0.5rem] bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[var(--primary-blue)] active:bg-[var(--input-active-bg)] box-border">
                                    <img src={PasswordIcon} alt="password icon" />
                                    <FormInput 
                                        type='password' 
                                        placeholder='Password' 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        name="password"
                                    />
                                </div>
                                {errors.password && (
                                    <p className='text-[var(--primary-red)] text-[0.7rem]'>{errors.password}</p>
                                )}
                            </div>
                            <p className="text-[0.7rem] font-[600] text-[var(--primary-blue)] cursor-pointer hover:underline" onClick={toggleForgotPassword}>Forgot password?</p>
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
