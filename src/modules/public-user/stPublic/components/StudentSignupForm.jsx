import FormInput from "../../../../utils/FormInput";
import { FcGoogle } from "react-icons/fc";
import EmailIcon from '../../../../assets/icons/email.svg';
import PasswordIcon from '../../../../assets/icons/lock.svg';
import { MdChevronRight } from "react-icons/md";
import PropTypes from 'prop-types';

const StudentSignupForm = ({ toggleAuthView }) => {
    return (
        <div className=" h-fit flex flex-col items-center justify-center">
            <h2>Signup</h2>
            <div className="w-full flex items-center justify-center gap-[0.5rem] border border-[var(--primary-blue)] px-[2rem]  rounded-[0.3rem] cursor-pointer">
                <FcGoogle />
                <p className="text-[0.7rem] font-[600] text-[var(--primary-blue)]">Signup using Google</p>
            </div>
            <div className="flex items-center gap-[0.5rem]">
                <p>Or</p>
            </div>
            <div className="flex flex-col gap-[1.5rem]">
                <FormInput type='email' placeholder='Email' icon={EmailIcon} className="w-full py-[0.5rem] px-[2rem] rounded-[0.3rem] box-border"/>
                <FormInput type='password' placeholder='Password' icon={PasswordIcon} className="w-full py-[0.5rem] px-[2rem] rounded-[0.3rem] box-border"/>
                <FormInput type='password' placeholder='Password' icon={PasswordIcon} className="w-full py-[0.5rem] px-[2rem] rounded-[0.3rem] box-border"/>
                <button className="w-full flex items-center justify-center gap-[0.5rem] bg-[var(--primary-blue)] text-[var(--bg-white)] py-[0.5rem] rounded-[0.3rem]">
                    Signup
                    <MdChevronRight color="var(--bg-white)" size={25}/>
                </button>
                <p>
                    Already have an account ? 
                    <span className='text-[var(--primary-blue)] cursor-pointer' onClick={toggleAuthView}> login</span>
                </p>
            </div>
        </div>
    )
}

StudentSignupForm.propTypes = {
    toggleAuthView: PropTypes.func
}

export default StudentSignupForm
