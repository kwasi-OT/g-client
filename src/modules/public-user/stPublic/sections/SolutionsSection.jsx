import SolutionCard from "../components/SolutionCard"
import SDLogo from "../../../../assets/sd-logo.png"
import DSLogo from '../../../../assets/ds-logo.png'
import CCLogo from '../../../../assets/cc-logo.png'

const SolutionsSection = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full h-[90vh]">
            <div className="w-[80%] h-[75%] mx-auto flex flex-col justify-between">
                <div className="flex flex-col items-center w-[100%]">
                    <h1>Our solutions</h1>
                    <p>Create your account quickly with just your email or social media login, then explore a wide range </p>
                </div>
                <div className="flex justify-between w-[100%] h-[65%]">
                    <SolutionCard logo={SDLogo} title="Software Development" description="Unlock your potential with comprehensive training in modern software development, from coding fundamentals to building complex applications.
" price="$350" />
                    <SolutionCard logo={DSLogo} title="Data Science Mastery" description="Equip yourself with the skills to analyze, interpret, and leverage data, becoming an expert in machine learning, AI, and data-driven decision-making." price="$300"  />
                    <SolutionCard logo={CCLogo} title="Cloud Computing Expertise" description="Gain hands-on experience in cloud architecture and deployment, preparing you to design, implement, and manage scalable cloud solutions in the real world." price="$300" />
                </div>
            </div>
        </div>
    )
}

export default SolutionsSection
