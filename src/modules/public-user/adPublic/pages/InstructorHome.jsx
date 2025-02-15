import HeroSection from "../sections/HeroSection"
import ReasonSection from "../sections/ReasonSection"
import MetricSection from "../sections/MetricSection"
import HowSection from "../sections/HowSection"

const InstructorHome = () => {
    return (
        <div className='w-full h-fit flex flex-col'>
            <HeroSection />
            <ReasonSection />
            <MetricSection />
            <HowSection />
        </div>
    )
}

export default InstructorHome
