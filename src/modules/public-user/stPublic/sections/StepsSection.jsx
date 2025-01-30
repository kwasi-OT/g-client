import StackCard from '../components/StackCard'

const StepsSection = () => {
    const stacks = [
        'ReactJs',
        'NextJs',
        'NodeJs',
        'Django',
        'MongoDB',
        'VueJs',
        'PowerBI',
        'Python',
        'Excel',
        'Tableau',
        'AWS',
        'Azure'
    ]

    return (
        <div className='w-full h-[45vh] bg-[var(--primary-blue)] text-[var(--bg-white)]'>
            <div className="w-[80%] h-[90%] mx-auto flex flex-col justify-center items-start">
                <div className='w-[100%] flex flex-col justify-center items-center'>
                    <h1>What will be next step</h1>
                    <p>Discover our diverse stack of solutions, including software development, data science, and cloud tools. Sign up today and kickstart your journey!</p>
                </div>
                <div className='w-[100%] flex justify-center items-center'>
                    {
                        stacks.map((stack, index) => (
                            <StackCard key={index} stack={stack} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default StepsSection
