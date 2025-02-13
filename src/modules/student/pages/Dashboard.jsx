import { LuLayoutDashboard } from "react-icons/lu";


const Dashboard = () => {
    return (
        <div className="w-full mx-auto h-[90vh]">
            <div className="top w-[100%] mx-auto h-[30%] flex flex-col justify-center bg-[var(--primary-blue)]">
                <div className="w-[80%] mx-auto h-[20%] flex items-center justify-start gap-[0.6rem] mb-[2.5rem]">
                    <LuLayoutDashboard size={45} color="white" />
                    <h1 className="text-[2.5rem] font-[700] text-[white]">Dashboard</h1>
                </div>
            </div>
            <div className="bottom flex flex-col justify-center items-center w-[100%] mx-auto h-[70%] bg-[var(--bg-white)]">
                <div className="content absolute top-[25%] w-[80%] mx-auto h-fit bg-[var(--bg-white)]">
                    <h1>Student Dashboard Page</h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
