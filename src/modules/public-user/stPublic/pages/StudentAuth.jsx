import { useState } from 'react'
import StudentLoginForm from '../components/StudentLoginForm'
import StudentSignupForm from '../components/StudentSignupForm'
import LeftSectionImg from '../../../../assets/st-auth.png'
import Logo from '../../../../assets/gclient-logo.png'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../routing/routes'

const StudentAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    // toggle between login and signup
    const toggleAuthView = () => {
        setIsLogin(!isLogin);
    }

    // navigate to homepage
    const handleNavigate = () => {
        navigate(ROUTES.COMMON.HOME);
    }

    return (
        <div className="w-full h-full bg-[var(--bg-white)] mx-auto mt-6 flex justify-center items-center">
            <div className="left w-[60%] h-[100vh] bg-[var(--bg-white)]">
                <div onClick={handleNavigate}>
                    <img src={Logo} alt="logo" className='absolute top-[5%] left-[2%] w-[10%] h-auto object-contain cursor-pointer' />
                </div>
                <img src={LeftSectionImg} alt="student authentication image" className='w-full h-full object-contain'/>
            </div>
            <div className="right w-[40%] h-fit flex flex-col justify-center items-start ">
                {isLogin ? (
                    <div>
                        <StudentLoginForm toggleAuthView={toggleAuthView}/>
                    </div>
                ) : (
                    <div>
                        <StudentSignupForm toggleAuthView={toggleAuthView}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentAuth
