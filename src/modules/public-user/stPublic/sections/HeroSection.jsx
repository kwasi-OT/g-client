import HeroImage from '../../../../assets/pc-robo.png'

const HeroSection = () => {
    return (
        <div className='w-full h-[70dvh] bg-[var(--primary-blue)]'>
            <div className="w-[80%] h-[100%] mx-auto flex items-center justify-between">
                <div className="flex flex-col justify-start items-start w-[50%] h-[90%] text-[var(--bg-white)]">
                    <h1 className='text-[2.5rem] font-bold'>Unlock Your Potential with 
                    Industry-Leading Courses!</h1>
                    <p className='text-[1.2rem] mt-4'>&quot;Join thousands of learners gaining real-world skills and advancing their careers. Our expert-led courses are designed to empower you to succeed.&quot;</p>
                    <button className='bg-transparent text-white px-[1.5rem] py-[1rem] rounded-[0.3rem] mt-[1rem] border border-[var(--bg-white)]'>Get Started</button>
                </div>
                <div className="w-[50%] h-[100%]">
                    <img src={HeroImage} alt="Hero Image" className="w-[100%] h-[90%] object-contain" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection
