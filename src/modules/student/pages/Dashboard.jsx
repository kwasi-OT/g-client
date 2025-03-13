import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from "react";
import MyLearning from "../components/MyLearning";
import Certificates from "../components/Certificates";
import Profile from "../components/Profile";
import Transactions from "../components/Transactions";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('learning')

    // handle tab selection
    const handleTabChange = (tab) => {
        setActiveTab(tab)
    };

    return (
        <div className="w-full mx-auto h-[70vh]">
            <div className="top w-[100%] mx-auto h-[10%] flex flex-col justify-center bg-[var(--primary-blue)]">
                <div className="w-[80%] mx-auto h-[100%] flex items-center justify-start gap-[0.6rem]">
                    <div className="w-[20%] flex items-center gap-[0.6rem]">
                        <LuLayoutDashboard size={40} color="white" />
                        <h1 className="text-[2rem] font-[700] text-[white]">Dashboard</h1>
                    </div>
                    <div className="w-[80%] h-[50%] mt-[2rem] flex items-center justify-start gap-[1rem]">
                        <button
                            onClick={() => handleTabChange('learning')}
                            className={activeTab === 'learning' ? 'bg-[var(--light-blue)] text-[var(--primary-blue)] hover:bg-[var(--light-blue)] hover:text-[var(--primary-blue)] rounded-t-[1rem] rounded-b-[0]' : 'hover:bg-[var(--light-blue)] hover:text-[var(--primary-blue)] rounded-t-[1rem] rounded-b-[0]'}
                        >
                            My Learning
                        </button>
                        <button 
                            onClick={() => handleTabChange('certificates')}
                            className={activeTab === 'certificates' ? 'bg-[var(--light-blue)] text-[var(--primary-blue)] hover:bg-[var(--light-blue)] hover:text-[var(--primary-blue)] rounded-t-[1rem] rounded-b-[0]' : 'hover:bg-[var(--light-blue)] hover:text-[var(--primary-blue)] rounded-t-[1rem] rounded-b-[0]'}
                        >
                            Certificates
                        </button>
                        <button
                            onClick={() => handleTabChange('transactions')}
                            className={activeTab === 'transactions' ? 'bg-[var(--light-blue)] text-[var(--primary-blue)] hover:bg-[var(--light-blue)] hover:text-[var(--primary-blue)] rounded-t-[1rem] rounded-b-[0]' : 'hover:bg-[var(--light-blue)] hover:text-[var(--primary-blue)] rounded-t-[1rem] rounded-b-[0]'}
                        >
                            Transactions
                        </button>
                        <button
                            onClick={() => handleTabChange('profile')}
                            className={activeTab === 'profile' ? 'bg-[var(--light-blue)] text-[var(--primary-blue)] hover:bg-[var(--light-blue)] hover:text-[var(--primary-blue)] rounded-t-[1rem] rounded-b-[0]' : 'hover:bg-[var(--light-blue)] hover:text-[var(--primary-blue)] rounded-t-[1rem] rounded-b-[0]'}
                        >
                            Profile
                        </button>
                    </div>
                </div>
            </div>
            <div className="bottom flex flex-col justify-start items-center w-[100%] h-[90%] bg-[var(--bg-white)]">
                <div className="content w-[80%] mx-auto h-[100%] bg-[var(--bg-white)]">
                    {activeTab === 'learning' && <MyLearning />}
                    {activeTab === 'certificates' && <Certificates />}
                    {activeTab === 'transactions' && <Transactions />}
                    {activeTab === 'profile' && <Profile />}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
