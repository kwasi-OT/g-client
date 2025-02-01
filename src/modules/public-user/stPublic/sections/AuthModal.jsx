import { useState } from 'react'
import StudentLoginForm from '../components/StudentLoginForm'
import StudentSignupForm from '../components/StudentSignupForm'

const AuthModal = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [ setIsSignup] = useState(false)

    // toggle between login and signup
    const toggleAuthView = () => {
        setIsLogin(!isLogin)
        setIsSignup(false)
    }

    return (
        <div className="w-[40%] h-[80%] bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="w-[90%] h-[90%] mx-auto mt-6">
                {isLogin ? (
                    <div>
                        <StudentLoginForm />
                    </div>
                ) : (
                    <div>
                        <StudentSignupForm />
                    </div>
                )}
            </div>
            <div>
                <p>
                    {isLogin ? (
                        <p>
                            Need to create an account ? 
                            <span className='text-blue-500 cursor-pointer' onClick={toggleAuthView}>signup</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account ? 
                            <span className='text-blue-500 cursor-pointer' onClick={toggleAuthView}>login</span>
                        </p>
                    )}
                </p>
            </div>
        </div>
    )
}

export default AuthModal
