import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StudentPublicRoutes  from '../../../../routing/student/public-routes'
import LogoImage from '../../../../assets/gclient-logo.png'
import { FiLogIn } from 'react-icons/fi'
import AuthModal from '../sections/AuthModal'

const Header = () => {
    const [openModal, setOpenModal] = useState(false)

    // toggle modal 
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    // close modal on escape key press
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                setOpenModal(false);
            }
        })
    })

    return (
        <div className="w-full flex flex-col justify-center align-items-center h-[6rem]">
            <div className=" w-[80%] mx-auto flex items-center justify-between px-4 ">
                <div className="flex items-center w-[50%] gap-[3rem]">
                    <img src={LogoImage} alt="Logo" className="w-[8rem] h-[3rem] object-contain" />
                    <nav className="flex gap-[2.5rem] text-[1.25rem]">
                        <Link to={StudentPublicRoutes.home}>Home</Link>
                        <Link>Courses</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4 w-[50%] justify-end">
                    <button className="flex items-center bg-[var(--bg-white)] gap-[0.5rem] text-[var(--primary-blue)] text-[1.25rem] font-[600] border border-[var(--primary-blue)] px-[2rem] py-[1rem] rounded-[0.3rem] cursor-pointer hover:bg-[var(--primary-blue)] hover:text-[var(--bg-white)]"  onClick={toggleModal}>Login <FiLogIn size='1.5rem' color='var(--primary-blue)' hover='var(--bg-white)'/></button>
                </div>
            </div>
            <AuthModal  isVisible={openModal}/>
        </div>
    )
}

export default Header
