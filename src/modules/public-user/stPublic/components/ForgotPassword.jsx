import EmailIcon from '../../../../assets/icons/email.svg';
import { MdChevronRight } from "react-icons/md";
import FormInput from "../../../../utils/FormInput";

const ForgotPassword = () => {
    return (
        <div className=" h-fit flex flex-col items-center justify-center w-full pb-[2rem] px-[0]">
            <h2>Forgot password</h2>
            <div className="flex flex-col gap-[1.5rem]">
                <FormInput type='email' placeholder='Email' icon={EmailIcon} className="w-full py-[0.5rem] px-[2rem] rounded-[0.3rem] box-border"/>
                <button className="w-full flex items-center justify-center bg-[var(--primary-blue)] text-[var(--bg-white)] py-[0.5rem] rounded-[0.3rem]">
                    Reset password
                    <MdChevronRight color="var(--bg-white)" size={20}/>
                </button>
            </div>
        </div>
    )
}

export default ForgotPassword
