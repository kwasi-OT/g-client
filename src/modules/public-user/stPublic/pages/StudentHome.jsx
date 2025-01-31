import HeroSection from "../sections/HeroSection"
import SolutionsSection from "../sections/SolutionsSection"
import StepsSection from "../sections/StepsSection"
import RegisterSection from "../sections/RegisterSection"

const StudentHome = () => {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen h-fit">
            <HeroSection />
            <SolutionsSection />
            <StepsSection />
            <RegisterSection />
        </div>
    )
}

export default StudentHome
