import { useState } from 'react'
import StudentLoginForm from '../components/StudentLoginForm'
import StudentSignupForm from '../components/StudentSignupForm'
import PropTypes from 'prop-types'

const AuthModal = ({isVisible}) => {
    const [isLogin, setIsLogin] = useState(true)
    const [ setIsSignup] = useState(false)
    
    if(!isVisible) return null

    // toggle between login and signup
    const toggleAuthView = () => {
        setIsLogin(!isLogin)
        setIsSignup(false)
    }

    return (
        <div className="fixed top-[52.5%] left-[75%] z-[1] transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[75%] bg-[var(--bg-white)] mx-auto mt-6 border border-[var(--primary-blue)] rounded-[0.3rem] shadow-lg flex flex-col justify-center items-center">
            <div className="w-[90%] h-[90%] flex flex-col justify-between items-center">
                {isLogin ? (
                    <div>
                        <StudentLoginForm />
                    </div>
                ) : (
                    <div>
                        <StudentSignupForm />
                    </div>
                )}
                <p>
                    {isLogin ? (
                        <p>
                            Need to create an account ? 
                            <span className='text-[var(--primary-blue)] cursor-pointer' onClick={toggleAuthView}> signup</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account ? 
                            <span className='text-[var(--primary-blue)] cursor-pointer' onClick={toggleAuthView}> login</span>
                        </p>
                    )}
                </p>
            </div>
        </div>
    )
}

AuthModal.propTypes = {
    isVisible: PropTypes.bool.isRequired
}

export default AuthModal
