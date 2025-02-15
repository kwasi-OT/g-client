import HeroSection from "../sections/HeroSection"
import ReasonSection from "../sections/ReasonSection"
import MetricSection from "../sections/MetricSection"

const InstructorHome = () => {
    return (
        <div className='w-full h-fit flex flex-col'>
            <HeroSection />
            <ReasonSection />
            <MetricSection />
        </div>
    )
}

export default InstructorHome
