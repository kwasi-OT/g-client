import SolutionCard from "../components/SolutionCard"
import SDLogo from "../../../../assets/sd-logo.png"
import DSLogo from '../../../../assets/ds-logo.png'
import CCLogo from '../../../../assets/cc-logo.png'

const SolutionsSection = () => {

    return (
        <div className="flex items-center w-full h-[100vh]">
            <div className="w-[80%] h-[100%] mx-auto flex flex-col items-center justify-between">
                <div className="flex flex-col items-center w-[100%] h-[10%]">
                    <h1>Our solutions</h1>
                    <p>Create your account quickly with just your email or social media login, then explore a wide range </p>
                </div>
                <div className="flex justify-between w-[100%] h-[85%]">
                    <SolutionCard logo={SDLogo} title="Software Development" description="Unlock your potential with comprehensive training in modern software development, from coding fundamentals to building complex applications.
" price="$350" />
                    <SolutionCard logo={DSLogo} title="Data Science Mastery" description="Equip yourself with the skills to analyze, interpret, and leverage data, becoming an expert in machine learning, AI, and data-driven decision-making." price="$300" />
                    <SolutionCard logo={CCLogo} title="Cloud Computing Expertise" description="Gain hands-on experience in cloud architecture and deployment, preparing you to design, implement, and manage scalable cloud solutions in the real world." price="$300" />
                </div>
            </div>
        </div>
    )
}

export default SolutionsSection
