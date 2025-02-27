import HeroImage from '../../../../assets/heroimg-nobg.png'
import { useNavigate } from 'react-router-dom'
import { ROUTES} from '../../../../routing/routes'

const HeroSection = () => {
    const navigate = useNavigate();

    // navigate to instAuth page
    const handleInstAuth = () => {
        navigate(ROUTES.COMMON.INSTAUTH);
    }
    
    return (
        <div className='w-full h-[37.5rem] bg-[var(--inst-cta-bg)]'>
            <div className="w-[80%] h-[100%] mx-auto flex items-center justify-center">
                <div className="flex flex-col justify-start items-start w-[30%] h-[90%] pt-[5%] text-[var(--inst-hero-text-h1)]">
                    <h1 className='text-[3rem] font-bold'>Come teach <br/>with us</h1>
                    <p className='text-[1.2rem] mt-4'>Become an instructor and change lives <br/>— including your own</p>
                    <button className='bg-[var(--primary-blue)] text-white px-[4rem] py-[1.5rem] rounded-[0.3rem] mt-[1.5rem] hover:bg-[var(--logo-blue)] box-border' onClick={handleInstAuth}>Get Started</button>
                </div>
                <div className="w-[50%] h-[100%]">
                    <img src={HeroImage} alt="Hero Image" className="w-[100%] h-[90%] object-contain" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection
