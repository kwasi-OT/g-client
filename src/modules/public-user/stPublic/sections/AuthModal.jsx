import { useState } from 'react'
import StudentLoginForm from '../components/StudentLoginForm'
import StudentSignupForm from '../components/StudentSignupForm'
import PropTypes from 'prop-types'

const AuthModal = ({isVisible}) => {
    const [isLogin, setIsLogin] = useState(true);
    
    if(!isVisible) return null

    // toggle between login and signup
    const toggleAuthView = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className="absolute top-[6rem] left-[60%] z-[1] w-[30%] h-fit bg-[var(--bg-white)] mx-auto mt-6 border border-[var(--primary-blue)] rounded-[0.3rem] shadow-lg flex flex-col justify-center items-center">
            <div className="w-[90%] h-fit flex flex-col justify-between items-center">
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

AuthModal.propTypes = {
    isVisible: PropTypes.bool
}

export default AuthModal
