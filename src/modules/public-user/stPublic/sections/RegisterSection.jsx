import Register from '../components/Register'
import Steps from '../components/Steps'

const RegisterSection = () => {
    return (
        <div className='w-full h-[100vh] bg-bg-body'>
            <div className='w-[80%] h-full mx-auto flex justify-between items-center h-full'>
                <Steps />
                <Register />
            </div>
        </div>
    )
}

export default RegisterSection
