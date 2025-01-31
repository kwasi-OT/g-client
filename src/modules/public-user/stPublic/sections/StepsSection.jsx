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

    // loop through the stacks and render a StackCard for each one with 6 different border colors each, for the first 6 and repeat the last 6 with the same colors
    const renderStacks = () => {
        const borderColors = [
            'border-[#E6E6E6]', 
            'border-[#28ACE2]', 
            'border-[#77C053]', 
            'border-[#A61D24]', 
            'border-[#D89614]', 
            'border-[#999999]'
        ];
        return stacks.map((stack, index) => (
            <StackCard 
                key={index} 
                stack={stack} 
                className={`flex flex-col items-center border rounded-[0.3rem] py-[0.1rem] px-[3rem] ${borderColors[index % 6]}`}
            />
        ))
    }
    
    return (
        <div className='flex flex-col items-center justify-center w-full h-fit bg-[var(--primary-blue)] text-[var(--bg-white)]'>
            <div className="w-[80%] h-[90%] mx-auto flex flex-col justify-center items-center pt-[2rem] gap-[3rem]">
                <div className='w-[60%] flex flex-col justify-center items-center'>
                    <h1>What will be next step</h1>
                    <p className='text-center mt-[-0.7rem]'>Discover our diverse stack of solutions, including software development, data science, and cloud tools. Sign up today and kickstart your journey!</p>
                </div>
                <div className='w-[100%] h-[60%] flex flex-wrap justify-center items-center gap-[1.5rem] pb-[4rem]'>
                    {
                        renderStacks()
                    }
                </div>
            </div>
        </div>
    )
}

export default StepsSection
