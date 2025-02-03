import { useState} from 'react'
import { MdChevronRight } from "react-icons/md";
import FormInput from "../../../../utils/FormInput";
import PasswordIcon from '../../../../assets/icons/lock.svg';
import StudentSignupForm from "./StudentSignupForm";
// import PropTypes from 'prop-types';

const ResetPassword = () => {
    const [isSignup, setIsSignup] = useState(false);

    // toggle signup view
    const toggleSignupView = () => {
        setIsSignup(!isSignup)
    }

    return (
        <>
            {isSignup ? 
                (
                    <StudentSignupForm />
                ) 
                : 
                (
                    <div className=" h-fit flex flex-col items-center justify-center w-full pb-[2rem] px-[0]">
                        <h2>Reset password</h2>
                        <p className='text-[0.95rem] pb-[0.5rem]'>Create a new password and get started</p>
                        <div className="flex flex-col gap-[1.5rem]">
                            <FormInput type='password' placeholder='New Password' icon={PasswordIcon} className="w-full py-[0.5rem] px-[2rem] rounded-[0.3rem] box-border"/>
                            <FormInput type='password' placeholder='Confirm Password' icon={PasswordIcon} className="w-full py-[0.5rem] px-[2rem] rounded-[0.3rem] box-border"/>
                            <button className="w-full flex items-center justify-center gap-[0.5rem] bg-[var(--primary-blue)] text-[var(--bg-white)] py-[0.5rem] rounded-[0.3rem]">
                                Reset password
                                <MdChevronRight color="var(--bg-white)" size={25}/>
                            </button>
                            <p>
                                Need to create an account ? 
                                <span className='text-[var(--primary-blue)] cursor-pointer' onClick={toggleSignupView}> signup</span>
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ResetPassword
