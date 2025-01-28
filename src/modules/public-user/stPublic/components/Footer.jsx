// import React from 'react'

const Footer = () => {
    return (
        <div className="w-full h-[16rem] bg-[var(--primary-blue)]">
            <div className="w-[80%] h-[100%] mx-auto flex flex-col justify-between">
                <div className="flex justify-between w-[100%] h-[80%]">
                    <div className="w-[50%]"></div>
                    <div className="w-[50%]"></div>
                </div>
                <div className="flex justify-between w-[100%] h-[20%] border-t border-white text-white text-[1.25rem]">
                    <div className="w-[50%]">
                        <h3>copyright 2025 - G-client, All rights reserved</h3>
                    </div>
                    <div className="w-[50%] justify-end">
                        <h3>Back to top</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
