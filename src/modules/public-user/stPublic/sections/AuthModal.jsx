import { useState } from 'react'
import StudentLoginForm from '../components/StudentLoginForm'
import StudentSignupForm from '../components/StudentSignupForm'
import PropTypes from 'prop-types'

const AuthModal = ({isVisible}) => {
    const [isLogin, setIsLogin] = useState(true)
    
    if(!isVisible) return null

    // toggle between login and signup
    const toggleAuthView = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className="fixed top-[14.5%] left-[60%] z-[1] w-[30%] h-fit bg-[var(--bg-white)] mx-auto mt-6 border border-[var(--primary-blue)] rounded-[0.3rem] shadow-lg flex flex-col justify-center items-center">
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
                {/* <p>
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
                </p> */}
            </div>
        </div>
    )
}

AuthModal.propTypes = {
    isVisible: PropTypes.bool.isRequired
}

export default AuthModal
