import TeachImg from '../../../../assets/teach.svg'
import InspireImg from '../../../../assets/inspire.svg'
import RewardImg from '../../../../assets/reward.svg'

const ReasonSection = () => {
    return (
        <div className="w-full h-[30.5rem] bg-[var(--bg-white)] pt-[2%] pb-[3%] flex flex-col items-center justify-center">
            <div className="w-[80%] h-[20%] flex flex-col items-center justify-center">
                <h2 className='text-[var(--inst-hero-text-h1)] text-[3rem]'>So many reasons to start with us</h2>
            </div>
            <div className="w-[70%] h-[80%] flex items-center justify-between">
                <div className="w-[20%] h-[100%] flex flex-col items-center justify-center">
                    <img src={TeachImg} alt="teach your way" className='w-[50%]'/>
                    <h3>Teach your way</h3>
                    <p>Publish the course you want, in the way you want, and always have control of your own content</p>
                </div>
                <div className="w-[20%] h-[100%] flex flex-col items-center justify-center">
                    <img src={InspireImg} alt="inspire learners" className='w-[50%]'/>
                    <h3>Inspire learners</h3>
                    <p>Teach what you know and help learners explore their interests, gain new skills, and advance their careers</p>
                </div>
                <div className="w-[20%] h-[100%] flex flex-col items-center justify-center">
                    <img src={RewardImg} alt="get rewarded" className='w-[50%]'/>
                    <h3>Get rewarded</h3>
                    <p>Expand your professional network, build your expertise, and earn money on each paid enrollment</p>
                </div>
            </div>
        </div>
    )
}

export default ReasonSection
