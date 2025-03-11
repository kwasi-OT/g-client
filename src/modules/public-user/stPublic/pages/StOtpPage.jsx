import SignupSuccess from "../components/SignupSuccess"
import { ROUTES } from "../../../../routing/routes"
import { Link } from "react-router-dom"
import Logo from "../../../../assets/footer-logo.png"
import LeftSectionImg from "../../../../assets/otpimage.png"

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
                            Secure Your Account with Email Verification.
                        </h1>
                    </div>
                </div>
                <div className="bottom w-[100%] h-[50%]">
                    <img src={LeftSectionImg} alt="left section image" className="w-[100%] h-[100%] object-cover" />
                </div>
            </div>
            <div className="authRight w-[70%] h-[100%] bg-[var(--bg-white)]">
                <div className='content-container w-[90%] h-[100%] mx-auto mt-[1.5rem] mb-[2rem]'>
                    <div className='w-[100%] h-[90%] mt-[-4rem] flex justify-center items-center'>
                        <SignupSuccess />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StOtpPage
