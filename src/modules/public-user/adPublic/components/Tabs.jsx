import { useState } from "react"
import PlanCurriculum from "./PlanCurriculum"
import RecordVideo from "./RecordVideo"
import LaunchCourse from "./LaunchCourse"


const Tabs = () => {
    const [activeTab, setActiveTab] = useState('plan');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="tabs flex items-center justify-center">
                <button onClick={() => handleTabChange('plan')} className={activeTab === 'plan' ? 'active bg-[white] text-[black] font-[600]' : 'bg-[white] text-[var(--inst-hero-text-p)]'}>Plan your curriculum</button>
                <button onClick={() => handleTabChange('record')} className={activeTab === 'record' ? 'active bg-[white] text-[black] font-[600]' : 'bg-[white] text-[var(--inst-hero-text-p)]'}>Record your video</button>
                <button onClick={() => handleTabChange('launch')} className={activeTab === 'launch' ? 'active bg-[white] text-[black] font-[600]' : 'bg-[white] text-[var(--inst-hero-text-p)]'}>Launch your course</button>
            </div>
            <div className="w-full h-[1px] bg-[var(--primary-grey)]"></div>
            {activeTab === 'plan' && <PlanCurriculum />}
            {activeTab === 'record' && <RecordVideo />}
            {activeTab === 'launch' && <LaunchCourse />}
        </div>
    )
}

export default Tabs
