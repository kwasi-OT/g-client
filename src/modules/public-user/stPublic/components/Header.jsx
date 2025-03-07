// import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../../../routing/routes'
import LogoImage from '../../../../assets/gclient-logo.png'
import { FiLogIn } from 'react-icons/fi'
// import { IoIosArrowDown } from "react-icons/io";
// import Modal from '../../../../utils/Modal'
// import { PiGraduationCapThin } from "react-icons/pi";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();


    // navigate to student auth page
    const handleStudentAuth = () => {
        navigate(ROUTES.COMMON.STAUTH);
    }

    // navigate to instructor homepage
    const handleAdminPortal = () => {
        navigate(ROUTES.COMMON.INSTRUCTOR);
    }

    // navigate to instAuth page
    const handleInstAuth = () => {
        navigate(ROUTES.COMMON.INSTAUTH);
    }

    // determine if current route is an instructor 
    const isInstructorRoute = location.pathname.startsWith(ROUTES.COMMON.INSTRUCTOR);

    // conditionally render admin login button
    const renderAdminLoginButton = () => {
        if (isInstructorRoute) {
            return (
                <button className="flex items-center bg-[var(--bg-white)] gap-[0.5rem] text-[var(--primary-blue)] text-[1.25rem] font-[600] border border-[var(--primary-blue)] px-[2rem] py-[1rem] rounded-[0.3rem] cursor-pointer hover:bg-[var(--primary-blue)] hover:text-[var(--bg-white)]" onClick={handleInstAuth}>
                    Login
                    <FiLogIn style={{fontSize: '1.5rem', color: 'var(--primary-blue) hover:color: var(--bg-white)'}}/>
                </button>
            );
        } else {
            return (
                <button className="flex items-center bg-[var(--bg-white)] gap-[0.5rem] text-[var(--primary-blue)] text-[1.25rem] font-[600] border border-[var(--primary-blue)] px-[2rem] py-[1rem] rounded-[0.3rem] cursor-pointer hover:bg-[var(--primary-blue)] hover:text-[var(--bg-white)]"  onClick={handleStudentAuth}>
                    Login <FiLogIn style={{fontSize: '1.5rem', color: 'var(--primary-blue)hover:color: var(--bg-white)'}}/>
                </button>
            );
        }
    };

    // determin if current is a student dashboard
    const isStudentDashboard = location.pathname.startsWith(ROUTES.STUDENT.DASHBOARD);

    return (
        <div className="w-full flex flex-col justify-center align-items-center h-[6rem]">
            <div className=" w-[80%] mx-auto flex items-center justify-between px-4 ">
                <div className="flex items-center w-[50%] gap-[3rem]">
                    <Link to={ROUTES.COMMON.HOME} className='flex items-center'>
                        <img src={LogoImage} alt="Logo" className="w-[8rem] h-[3rem] object-contain" />
                    </Link>
                    <nav className="flex gap-[2.5rem] text-[1.25rem]">
                        <Link to={ROUTES.COMMON.HOME}>Home</Link>
                        <Link to={ROUTES.STUDENT.COURSES}>Courses</Link>
                    </nav>
                </div>
                <div className='flex items-center w-[30%] justify-end'>
                    {isStudentDashboard ? ('') : 
                        (
                            <button className='text-[var(--primary-blue)] text-[1rem] font-[400] bg-[var(--bg-white)] hover:bg-[var(--button-hover)] rounded-[0.3rem] px-[1rem] py-[1.2rem]' onClick={handleAdminPortal}>
                        Teach on G-Client
                    </button>
                        )
                    }
                    <div className="flex items-center gap-4 w-[50%] justify-end">
                        {renderAdminLoginButton()}
                    </div>
                </div>
            </div>
            {/* <Modal 
                isOpen={openMenu} 
                onClose={() => setOpenMenu(false)}
                size='md'
                >
                    <div className='fixed top-[6rem] left-[75.5%] z-[1] w-[14%] h-fit bg-[var(--bg-white)] mx-auto mt-6 border border-[var(--primary-blue)] rounded-[0.3rem] flex flex-col justify-center items-start'>
                        <button className='w-full border-none bg-[var(--bg-white)] text-[#000] text-[1rem] font-[400] px-4 py-2 hover:text-[var(--primary-blue)] flex items-center gap-[0.8rem]' >
                            <PiGraduationCapThin style={{fontSize: '1.3rem', color: '(var(--primary-black) hover:color: var(--primary-blue)'}}/>
                            Portal?
                        </button>
                        <button className='w-full border-none bg-[var(--bg-white)] text-[#000] text-[1rem] font-[400] px-4 py-2 hover:text-[var(--primary-blue)] flex items-center gap-[1rem] ' onClick={handleLogout}>
                            <FiLogIn style={{fontSize: '1rem', color: '(var(--primary-black) hover:color: var(--primary-blue)'}}/>
                            Logout
                        </button>
                    </div>
            </Modal> */}
        </div>
    )
}

export default Header
