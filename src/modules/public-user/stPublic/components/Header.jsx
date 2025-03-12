import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../../../routing/routes'
import LogoImage from '../../../../assets/gclient-logo.png'
import { FiLogIn } from 'react-icons/fi'
import { IoIosArrowDown } from "react-icons/io";
import Modal from '../../../../utils/Modal'
import { PiGraduationCapThin } from "react-icons/pi";
import { supabase } from '../../../../server/supabaseClient'
import { ThreeDots } from 'react-loader-spinner'

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // get user
    useEffect(() => {
        const getUser = async () => {
            const { data: user, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error getting user:', error);
                return;
            } 
            setUser(user);
            console.log(user)
            console.log('user email:',user.user.email)
            console.log('user id:',user.user.id)

            // if user is logged in get first and last names
            if (user) {
                console.log('fetched user:', user)
                const {data: userData, error: userError} = await supabase
                    .from('users')
                    .select('*')
                    .eq('auth_id', user.user.id)
                    .single();

                if (userError) {
                    console.error('Error getting user data:', userError);
                    return;
                } 
                setUserData(userData);
                console.log('User data:', userData);
                console.log('User first name:', userData.first_name);
                setLoading(false);
            } else {
                console.warn('No user found. User is not logged in.');
            }
        };

        getUser();
    }, []);

    // Not authenticated
    // if (!user) {
    //     return <Navigate 
    //         to={ROUTES.COMMON.HOME} 
    //         state={{ from: location }} 
    //         replace 
    //     />;
    // }

    // handle logout
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout error:', error);
        } else {
            setUser(null);
            navigate(ROUTES.COMMON.HOME);
        }
    };

    // toggle menu open
    const handleToggle = () => {
        setOpenMenu(!openMenu);
    }

    // open student dashboard
    const handlePortal = () => {
        navigate(ROUTES.STUDENT.DASHBOARD)
    }


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
                <>
                    {user ? 
                        (
                            <div className='w-[6rem] h-[3rem] flex items-center justify-between cursor-pointer' onClick={handleToggle}>
                                <div className='w-[60%] h-[100%] px[1rem] rounded-full flex flex-col items-center justify-center bg-[var(--primary-blue)]'>
                                    {loading ? 
                                        <ThreeDots 
                                            color="var(--primary-blue)"
                                            size={24}
                                            visible={loading}
                                        /> 
                                        : 
                                        <h2 className='text-[var(--bg-white)]'>
                                            {userData.first_name[0]}{userData.last_name[0]}
                                        </h2>
                                    }
                                </div>
                                <IoIosArrowDown size={24} color="var(--primary-blue)" />  
                            </div>
                        ) 
                        : 
                        (
                            <button className="flex items-center bg-[var(--bg-white)] gap-[0.5rem] text-[var(--primary-blue)] text-[1.25rem] font-[600] border border-[var(--primary-blue)] px-[2rem] py-[1rem] rounded-[0.3rem] cursor-pointer hover:bg-[var(--primary-blue)] hover:text-[var(--bg-white)]"  onClick={handleStudentAuth}>
                                Login <FiLogIn style={{fontSize: '1.5rem', color: 'var(--primary-blue)hover:color: var(--bg-white)'}}/>
                            </button>
                        )
                    }
                </>
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
                        {/* <Link to={ROUTES.STUDENT.COURSES}>Courses</Link> */}
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
            <Modal 
                isOpen={openMenu} 
                onClose={() => setOpenMenu(false)}
                size='md'
                >
                    <div className='fixed top-[6rem] left-[75.5%] z-[1] w-[14%] h-fit bg-[var(--bg-white)] mx-auto mt-6 border border-[var(--primary-blue)] rounded-[0.3rem] flex flex-col justify-center items-start'>
                        <button className='w-full border-none bg-[var(--bg-white)] text-[#000] text-[1rem] font-[400] px-4 py-2 hover:text-[var(--primary-blue)] flex items-center gap-[0.8rem]' onClick={handlePortal}>
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
