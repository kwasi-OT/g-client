import {useState} from 'react'

export const Ongoing = () => {
    return (
        <div>
            <h1>On going courses</h1>
        </div>
    )
}

export const Completed = () => {
    return (
        <div>
            <h2>Completed</h2>
        </div>
    )
}

const MyLearning = () => {
    const [activeTab, setActiveTab] = useState('ongoing');

    // handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div>
            <div className='tabs flex items-center gap-[1rem] mb-[0.5rem]'>
                <button
                    onClick={() => handleTabChange('ongoing')}
                    className={
                        activeTab === 'ongoing' ? 
                        'bg-[var(--light-blue)] px-[1rem] py-[0.5rem] rounded-full text-[var(--primary-black)]'
                        :
                        'bg-[var(--bg-white)] border border-[var(--light-blue)] hover:bg-[var(--light-blue)] px-[1rem] py-[0.5rem] rounded-full text-[var(--primary-black)]'
                    }
                >
                    On Going
                </button>
                <button
                    onClick={() => handleTabChange('completed')}
                    className={
                        activeTab === 'completed' ? 
                        'bg-[var(--light-blue)] px-[1rem] py-[0.5rem] rounded-full text-[var(--primary-black)]'
                        :
                        'bg-[var(--bg-white)] border border-[var(--light-blue)] hover:bg-[var(--light-blue)] px-[1rem] py-[0.5rem] rounded-full text-[var(--primary-black)]'
                    }
                >
                    Completed
                </button>
            </div>
            <div className='divider w-[50%] h-[1px] bg-[var(--primary-grey)]'></div>
            <div className='content'>
                {activeTab === 'ongoing' && <Ongoing />}
                {activeTab === 'completed' && <Completed />}
            </div>
        </div>
    )
}

export default MyLearning
