// import React from 'react'
import { Link } from 'react-router-dom'
import StudentPublicRoutes  from '../../../../routing/student/public-routes'
import LogoImage from '../../../../assets/gclient-logo.png'
import { FiLogIn } from 'react-icons/fi'

const Header = () => {
    return (
        <div className="w-full flex flex-col justify-center align-items-center h-[6rem] border-b border-gray-200">
            <div className=" w-[80%] mx-auto flex items-center justify-between px-4 ">
                <div className="flex items-center w-[50%] gap-[3rem]">
                    <img src={LogoImage} alt="Logo" className="w-[8rem] h-[3rem] object-contain" />
                    <nav className="flex gap-[2.5rem]">
                        <Link to={StudentPublicRoutes.home}>Home</Link>
                        <Link>Courses</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4 w-[50%] justify-end">
                    <Link to={StudentPublicRoutes.login} className="flex items-center gap-[0.5rem] text-[var(--primary-blue)] font-[600] border border-[var(--primary-blue)] px-[2rem] py-[1rem] rounded-[0.3rem]">Login <FiLogIn size='1.5rem' color='var(--primary-blue)'/></Link>
                </div>
            </div>
        </div>
    )
}

export default Header
