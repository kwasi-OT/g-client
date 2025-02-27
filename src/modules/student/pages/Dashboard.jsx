import { LuLayoutDashboard } from "react-icons/lu";
import {NavLink, useLocation } from "react-router-dom";
import TestingImage from '../../../assets/testing.svg';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {ROUTES} from '../../../routing/routes';

const Dashboard = () => {
    const location = useLocation();
    console.log(location.pathname);

    return (
        <div className="w-full mx-auto h-[90vh]">
            <div className="top w-[100%] mx-auto h-[30%] flex flex-col justify-center bg-[var(--primary-blue)]">
                <div className="w-[80%] mx-auto h-[20%] flex items-center justify-start gap-[0.6rem] mb-[2.5rem]">
                    <LuLayoutDashboard size={45} color="white" />
                    <h1 className="text-[2.5rem] font-[700] text-[white]">Dashboard</h1>
                </div>
            </div>
            <div className="bottom flex flex-col justify-center items-center w-[100%] mx-auto h-[70%] bg-[var(--bg-white)]">
                <div className="content absolute top-[30%] w-[80%] mx-auto h-[50%] bg-[var(--bg-white)]">
                    <div className="w-[100%] h-[20%] flex items-center justify-start gap-[2rem]">
                        <NavLink to={ROUTES.STUDENT.REGISTER} className="w-[10%] h-[100%] flex items-center justify-center text-[black]">Application</NavLink>
                        <NavLink to={ROUTES.STUDENT.PROFILE} className="w-[10%] h-[100%] flex items-center justify-center text-[black]">Profile</NavLink>
                    </div>
                    <div className="w-[100%] h-[80%] flex flex-col items-center justify-center gap-[2rem]">
                        <img src={TestingImage} alt="testing" className="w-[50%] h-[50%]" />
                        <p>!!! OOPs no application</p>
                        <div className="w-[100%] h-[20%] flex items-center justify-center gap-[2rem]">
                            <button className="flex items-center justify-center gap-[0.5rem]">
                                <MdChevronLeft size={25} />
                                Back
                            </button>
                            <button className="flex items-center justify-center gap-[0.5rem]">
                                Start new application
                                <MdChevronRight size={25} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
