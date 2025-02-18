import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routing/routes';

const CtaSection = () => {
    // navigate to instAuth page
    const navigate = useNavigate();
    const handleInstAuth = () => {
        navigate(ROUTES.COMMON.INSTAUTH);
    }

    return (
        <div className='w-full h-[15.5rem] bg-[var(--inst-cta-bg)] pt-[2%] pb-[4%] flex flex-col items-center justify-center'>
            <div className='w-[70%] h-[80%] flex flex-col items-center justify-center'>
                <h2 className='text-[var(--inst-hero-text-h1)] text-[2.5rem]'>Become an instructor today</h2>
                <p className='mt-[-1rem] text-[var(--inst-hero-text-p)] text-[1.2rem]'>Join one of the world’s largest online learning marketplaces</p>
                <button className='bg-[var(--primary-blue)] text-white px-[4rem] py-[1.5rem] rounded-[0.3rem] mt-[1.5rem] hover:bg-[var(--logo-blue)] box-border' onClick={handleInstAuth}>Get Started</button>
            </div>
        </div>
    )
}

export default CtaSection
