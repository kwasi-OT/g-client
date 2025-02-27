import Tabs from "../components/Tabs"


const HowSection = () => {
    return (
        <div className="w-full h-fit bg-[var(--bg-white)] pt-[2%] pb-[2%] flex flex-col items-center justify-center">
            <h2 className='text-[var(--inst-hero-text-h1)] text-[3rem]'>How to begin</h2>
            <div className="w-[70%] h-[100%]">
                <Tabs />
            </div>
        </div>
    )
}

export default HowSection
