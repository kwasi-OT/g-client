import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../routing/routes'
import LogoImage from '../../../../assets/gclient-logo.png'
import { FiLogIn } from 'react-icons/fi'
import { IoIosArrowDown } from "react-icons/io";
import AuthModal from '../sections/AuthModal'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../store/slices/authSlice'
import Modal from '../../../../utils/Modal'
import { PiGraduationCapThin } from "react-icons/pi";
import { toast, ToastContainer } from 'react-toastify';
import { Blocks } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve user from localStorage with error handling
    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            return null;
        }
    })();

    console.log('Header User:', user);
    console.log('Is Authenticated:', isAuthenticated);

    // toggle modal 
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    // close modal if user authenticated
    useEffect(() => {
        if(isAuthenticated && user) {
            setOpenModal(false);
        }
    }, [user, isAuthenticated])

    // close modal on escape key press
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setOpenModal(false);
                setOpenMenu(false);
            }
        };

        window.addEventListener('keydown', handleEscapeKey);
        
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, [])

    // toggle menu
    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    // navigate to student dashboard
    const navigateToDashboard = () => {
        console.group('Navigate to Dashboard Debug');
        console.log('User:', user);
        console.log('Is Authenticated:', isAuthenticated);
        console.log('Attempting to navigate to:', ROUTES.STUDENT.DASHBOARD);

        if (isAuthenticated && user) {
            try {
                navigate(ROUTES.STUDENT.DASHBOARD);
                console.log('Navigation successful');
            } catch (error) {
                console.error('Navigation error:', error);
                toast.error('Navigation failed');
            }
        } else {
            console.warn('Cannot navigate: Not authenticated or no user');
            toast.error('Please log in to access the dashboard');
        }
        console.groupEnd();
        setOpenMenu(false);
    }

    // handle logout, display toast and run loader
    const handleLogout = () => {
        const notify = () => toast.success('Logout successful');
        dispatch(logout())
            .unwrap()
            .then(() => {
                notify();
                <Blocks  height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}
                wrapperClass="flex justify-center items-center h-screen"
                visible={true} />
                navigate(ROUTES.COMMON.HOME);
                setOpenMenu(false);
            })
        .catch((error) => {
            console.log('Logout failed', error);
        })
    }

    // navigate to admin portal
    const handleAdminPortal = () => {
        navigate(ROUTES.COMMON.INSTRUCTOR);
    }

    return (
        <div className="w-full flex flex-col justify-center align-items-center h-[6rem]">
            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                <div className='flex items-center w-[25%] justify-end'>
                    <button className='text-[var(--primary-blue)] text-[1rem] font-[400] bg-[var(--bg-white)] hover:bg-[var(--button-hover)] rounded-[0.3rem] px-[1rem] py-[1.2rem]' onClick={handleAdminPortal}>Teach on G-Client</button>
                    <div className="flex items-center gap-4 w-[50%] justify-end">
                        {user ? 
                            (
                                <div className='flex items-center gap-[2rem] cursor-pointer' onClick={toggleMenu}>
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
            </div>
            <AuthModal  isVisible={openModal}/>
            <Modal 
                isOpen={openMenu} 
                onClose={() => setOpenMenu(false)}
                size='md'
                >
                    <div className='fixed top-[6rem] left-[75.5%] z-[1] w-[14%] h-fit bg-[var(--bg-white)] mx-auto mt-6 border border-[var(--primary-blue)] rounded-[0.3rem] flex flex-col justify-center items-start'>
                        <button className='w-full border-none bg-[var(--bg-white)] text-[#000] text-[1rem] font-[400] px-4 py-2 hover:text-[var(--primary-blue)] flex items-center gap-[0.8rem]' onClick={navigateToDashboard}>
                            <PiGraduationCapThin style={{fontSize: '1.3rem', color: '(var(--primary-black) hover:color: var(--primary-blue)'}}/>
                            Portal?
                        </button>
                        <button className='w-full border-none bg-[var(--bg-white)] text-[#000] text-[1rem] font-[400] px-4 py-2 hover:text-[var(--primary-blue)] flex items-center gap-[1rem] ' onClick={handleLogout}>
                            <FiLogIn style={{fontSize: '1rem', color: '(var(--primary-black) hover:color: var(--primary-blue)'}}/>
                            Logout
                        </button>
                    </div>
            </Modal>
        </div>
    )
}

export default Header
