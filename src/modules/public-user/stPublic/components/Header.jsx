import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StudentPublicRoutes  from '../../../../routing/student/public-routes'
import LogoImage from '../../../../assets/gclient-logo.png'
import { FiLogIn } from 'react-icons/fi'
import { IoIosArrowDown } from "react-icons/io";
import AuthModal from '../sections/AuthModal'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../../store/slices/userSlice';


const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    console.log('Header User:', user);

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
    });

    useEffect(() => {
        if (user && user.user_id) {
            dispatch(fetchUser(user.user_id));
        }
    },[dispatch, user]);

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
                    {user ? 
                        (
                            <div className='flex items-center gap-[2rem] cursor-pointer'>
                                <div className='flex items-center gap-[1rem]'>
                                    <div className='rounded-full bg-[var(--primary-blue)] text-[var(--bg-white)] w-[2.5rem] h-[2.5rem] flex items-center justify-center text-[1rem] font-[600]'>
                                        {/* initials of name */}
                                        {/* <p>{user.firstname[0]}{user.lastname[0]}</p> */}
                                        <p>DD</p>
                                    </div>
                                    <div className='flex items-center gap-[0.5rem] text-[1rem] font-[400]'>
                                        <p>Daniel{user.firstname}</p>
                                        <p>Doe{user.lastname}</p>
                                    </div>
                                </div>
                                <div>
                                    <IoIosArrowDown size={25} className='mt-[0.5rem]'/>
                                </div>
                            </div>
                        ):
                        (
                            <button className="flex items-center bg-[var(--bg-white)] gap-[0.5rem] text-[var(--primary-blue)] text-[1.25rem] font-[600] border border-[var(--primary-blue)] px-[2rem] py-[1rem] rounded-[0.3rem] cursor-pointer hover:bg-[var(--primary-blue)] hover:text-[var(--bg-white)]"  onClick={toggleModal}>Login <FiLogIn style={{fontSize: '1.5rem', color: 'var(--primary-blue)hover:color: var(--bg-white)'}}/></button>
                        )
                    }
                </div>
            </div>
            <AuthModal  isVisible={openModal}/>
        </div>
    )
}

export default Header
