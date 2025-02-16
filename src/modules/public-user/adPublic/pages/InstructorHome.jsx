import HeroSection from "../sections/HeroSection"
import ReasonSection from "../sections/ReasonSection"
import MetricSection from "../sections/MetricSection"
import HowSection from "../sections/HowSection"
import CtaSection from "../sections/CtaSection"

const InstructorHome = () => {
    return (
        <div className='w-full h-fit flex flex-col'>
            <HeroSection />
            <ReasonSection />
            <MetricSection />
            <HowSection />
            <CtaSection />
        </div>
    )
}

export default InstructorHome
