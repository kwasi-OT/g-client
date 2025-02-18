import { Link } from 'react-router-dom'
import Logo from '../../../../assets/footer-logo.png'
import LeftSectionImg from '../../../../assets/left-section-down.png'
import WavesImg from '../../../../assets/waves.svg'
import { ROUTES } from '../../../../routing/routes'
import InstLogin from '../components/InstLogin'

const InstAuth = () => {
    return (
        <div className='w-full h-[100vh] flex'>
            <div className="authLeft w-[35%] h-full bg-[var(--primary-blue)]">
                <div className="top w-[100%] h-[40%] flex flex-col items-center justify-center">
                    <div className='w-[80%] h-[80%] mx-auto flex flex-col items-start'>
                        <Link to={ROUTES.COMMON.INSTRUCTOR} className='w-[50%] h-[17%]'>
                            <img src={Logo} alt="Logo" className='w-[100%] h-[100%] ml-[0.8rem]'/>
                        </Link>
                        <h1 className="text-[2rem] font-bold text-[white] ml-[0.8rem]">
                            Create Your Account to Manage and Access the Dashboard Effortlessly.
                        </h1>
                    </div>
                </div>
                <div className="middle w-[100%] h-[30%] absolute top-[21%] right-[35%]">
                    <img src={WavesImg} alt="waves image" className="w-[100%] h-[100%] object-contain" />
                </div>
                <div className="bottom w-[100%] h-[65%] overflow-hidden">
                    <img src={LeftSectionImg} alt="left section image" className="w-[100%] h-[100%] object-cover overflow-clip" />
                </div>
            </div>
            <div className="authRight w-[65%] h-[100%] bg-[var(--bg-white)]">
                <div className='content-container w-[90%] h-[100%] mx-auto mt-[1.5rem] mb-[2rem]'>
                    <div className='cta-container w-[100%] h-[10%] flex justify-end items-center'>
                        <div className='w-[50%] h-[100%] flex justify-center items-center gap-[1rem]'>
                            <p className='underline'>Need to create an account?</p>
                            <button className='bg-[var(--primary-blue)] text-[white] rounded-[0.3rem]'>Sign Up</button>
                        </div>
                    </div>
                    <div className='w-[100%] h-[90%] mt-[-4rem] flex justify-center items-center'>
                        <InstLogin />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstAuth
