// import React from 'react'
import { Link } from 'react-router-dom'
import StudentPublicRoutes  from '../../../../routing/student/public-routes'
import LogoImage from '../../../../assets/gclient-logo.png'
import { FiLogIn } from 'react-icons/fi'

const Header = () => {
    return (
        <div className="w-full flex flex-col justify-center align-items-center h-[5rem] border-b border-gray-200">
            <div className=" w-[80%] mx-auto flex items-center justify-between px-4 list-none text-decoration-none">
                <div className="flex items-center w-[50%] gap-[3rem]">
                    <img src={LogoImage} alt="Logo" className="w-[8rem] h-[2.5rem] object-contain" />
                    <nav className="flex gap-[2rem]">
                        <Link>Home</Link>
                        <Link>Courses</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4 w-[50%] justify-end">
                    <Link to={StudentPublicRoutes.login} className="text-primary-black font-semibold border border-primary-black px-[1.5rem] py-[0.5rem] rounded">Login <FiLogIn /></Link>
                </div>
            </div>
        </div>
    )
}

export default Header
