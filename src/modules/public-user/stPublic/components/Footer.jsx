// import { useEffect } from 'react'
import FooterLogo from '../../../../assets/footer-logo.png'
import { BsArrowUpSquare } from "react-icons/bs"
import { Link } from 'react-router-dom'

const Footer = () => {
    
    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }   

    return (
        <div className="w-full h-[16rem] bg-[var(--primary-blue)] p-10">
            <div className="w-[80%] h-[100%] mx-auto flex flex-col justify-between">
                <div className="flex justify-between w-[100%] h-[75%]">
                    <div className="flex items-center w-[50%] h-[90%]">
                        <img src={FooterLogo} alt="Footer Logo" className="w-[60%] h-[90%] object-contain" />
                    </div>
                    <div className="flex justify-between items-center w-[40%] text-[var(--bg-white)]">
                        <div className="flex flex-col justify-center items-start w-[20%] h-[90%]">
                            <h3>Menu</h3>
                            <ul className="flex flex-col ml-[-2.5rem] gap-[0.5rem] list-none">
                                <Link><li>Home</li></Link>
                                <Link><li>Courses</li></Link>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center items-start w-[40%] h-[90%]">
                            <h3>Contact</h3>
                            <ul className="flex flex-col ml-[-2.5rem] gap-[0.5rem] list-none">
                                <li>+233 24 555 5555</li>
                                <li>Adabraka, Ghana, Accra</li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center items-start w-[20%] h-[90%]">
                            <h3>Social</h3>
                            <ul className="flex flex-col ml-[-2.5rem] gap-[0.5rem] list-none">
                                <Link><li>LinkedIn</li></Link>
                                <Link><li>Facebook</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-[100%] h-[25%] py-10 border-t text-[1rem] font-[400] text-[var(--bg-white)]">
                    <div className="flex items-center w-[60%]">
                        <p className="flex items-center gap-[0.5rem]">
                            <span className='text-[1.6rem]'>&copy;</span>
                            copyright 2025 - G-client, All rights reserved
                        </p>
                    </div>
                    <div className="flex items-center justify-end gap-[0.5rem] cursor-pointer" onClick={backToTop}>
                        <p>Back To Top</p>
                        <BsArrowUpSquare size='1.5rem' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
