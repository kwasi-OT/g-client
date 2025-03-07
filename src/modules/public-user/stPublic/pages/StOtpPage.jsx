import Otp from "../components/Otp"
import { ROUTES } from "../../../../routing/routes"
import { Link } from "react-router-dom"
import Logo from "../../../../assets/footer-logo.png"
import LeftSectionImg from "../../../../assets/otpimage.png"
import { IoMdArrowBack } from "react-icons/io";

const StOtpPage = () => {
    return (
        <div className='w-full h-[100vh] flex overflow-hidden'>
            <div className="authLeft w-[30%] h-full bg-[var(--primary-blue)]">
                <div className="top w-[100%] h-[50%] flex flex-col items-center justify-center">
                    <div className='w-[80%] h-[80%] mx-auto flex flex-col items-start'>
                        <Link to={ROUTES.COMMON.HOME} className='w-[50%] h-[17%]'>
                            <img src={Logo} alt="Logo" className='w-[100%] h-[100%] ml-[0.8rem]'/>
                        </Link>
                        <h1 className="text-[1.5rem] font-[400] text-[white] ml-[0.8rem]">
                            Secure Your Account with OTP Verification. Simply enter the code we’ve sent to ensure your information stays safe and protected.
                        </h1>
                    </div>
                </div>
                <div className="bottom w-[100%] h-[50%]">
                    <img src={LeftSectionImg} alt="left section image" className="w-[100%] h-[100%] object-cover" />
                </div>
            </div>
            <div className="authRight w-[70%] h-[100%] bg-[var(--bg-white)]">
                <div className='content-container w-[90%] h-[100%] mx-auto mt-[1.5rem] mb-[2rem]'>
                    <div className='cta-container w-[100%] h-[10%] flex justify-start items-center'>
                        <Link to={ROUTES.COMMON.STAUTH} className='flex items-center gap-[0.5rem] text-[var(--primary-blue)] font-[500] text-[1rem] border border-[var(--primary-blue)] px-[1.5rem] py-[0.75rem] rounded-[0.3rem]'>
                            <IoMdArrowBack />
                            Back
                        </Link>
                    </div>
                    <div className='w-[100%] h-[90%] mt-[-4rem] flex justify-center items-center'>
                        <Otp />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StOtpPage
