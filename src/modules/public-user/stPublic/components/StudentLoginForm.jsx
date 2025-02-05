import { useState } from 'react';
import FormInput from "../../../../utils/FormInput";
import { FcGoogle } from "react-icons/fc";
import EmailIcon from '../../../../assets/icons/email.svg';
import PasswordIcon from '../../../../assets/icons/lock.svg';
import { MdChevronRight } from "react-icons/md";
import ForgotPassword from "./ForgotPassword";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../../store/slices/authSlice';
import { Blocks } from 'react-loader-spinner';

const StudentLoginForm = ({ toggleAuthView }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { isLoading, authError } = useSelector((state) => state.auth);
    
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
    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({});

        if (validateForm()) {
            dispatch(login(formData))
            .unwrap()
            .then((response) => {
                console.log('Login successful', response);
            })
            .catch((error) => {
                console.error('Login failed', error);
            });
        }
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
                    <div className=" h-fit flex flex-col items-center justify-center">
                        <h2>Login</h2>
                        <div className="w-full flex items-center justify-center gap-[0.5rem] border border-[var(--primary-blue)] px-[2rem]  rounded-[0.3rem] cursor-pointer">
                            <FcGoogle />
                            <p className="text-[0.7rem] font-[600] text-[var(--primary-blue)]">Log in using Google</p>
                        </div>
                        <div className="flex items-center gap-[0.5rem]">
                            <p>Or</p>
                        </div>
                        <form className="flex flex-col gap-[1.5rem]" onSubmit={handleSubmit}>
                            <FormInput 
                                type='email' 
                                placeholder='Email' 
                                icon={EmailIcon} 
                                className="w-full py-[0.5rem] px-[2rem] rounded-[0.3rem] box-border" 
                                value={formData.email} 
                                onChange={handleChange} 
                                name="email"
                                error={errors.email}
                            />
                            <FormInput 
                                type='password' 
                                placeholder='Password' 
                                icon={PasswordIcon} 
                                className="w-full py-[0.5rem] px-[2rem] rounded-[0.3rem] box-border" 
                                value={formData.password} 
                                onChange={handleChange} 
                                name="password"
                                error={errors.password}
                            />
                            {/* Global auth error display */}
                            {authError && (
                                <div className="text-red-500 text-sm mb-2">
                                    {authError}
                                </div>
                            )}
                            <p className="text-[0.7rem] font-[600] text-[var(--primary-blue)] cursor-pointer hover:underline" onClick={toggleForgotPassword}>Forgot password?</p>
                            <button className="w-full flex items-center justify-center gap-[0.5rem] bg-[var(--primary-blue)] text-[var(--bg-white)] py-[0.5rem] rounded-[0.3rem]" 
                            type='submit'
                            aria-busy={isLoading}
                            aria-label={isLoading ? "Logging in..." : "Login"}
                            disabled={isLoading}
                            >
                                {isLoading ? 
                                    (<Blocks
                                        visible={true}
                                        height="24"
                                        width="24"
                                        ariaLabel="Loading"
                                        color='var(--bg-white)'
                                        wrapperClass="flex items-center justify-center"
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
        </>
    )
}

StudentLoginForm.propTypes = {
    toggleAuthView: PropTypes.func
}

export default StudentLoginForm
