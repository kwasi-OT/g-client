import Register from '../components/Register'
import Steps from '../components/Steps'

const RegisterSection = () => {
    return (
        <div className='w-full h-[130vh] bg-bg-body flex flex-col items-center justify-center'>
            <div className='w-[80%] h-full mx-auto flex justify-between items-center'>
                <Steps />
                <Register />
            </div>
        </div>
    )
}

export default RegisterSection
