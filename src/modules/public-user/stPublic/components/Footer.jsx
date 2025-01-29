// import React from 'react'

const Footer = () => {
    return (
        <div className="w-full h-[16rem] bg-[var(--primary-blue)] p-10">
            <div className="w-[80%] h-[100%] mx-auto flex flex-col justify-between">
                <div className="flex justify-between w-[100%] h-[75%]">
                    <div className="w-[50%]"></div>
                    <div className="w-[50%]"></div>
                </div>
                <div className="flex justify-between w-[100%] h-[25%] py-10 border-t font-[1.25rem] text-[var(--bg-white)]">
                    <div className="flex items-center w-[60%]">
                        <h3>copyright 2025 - G-client, All rights reserved</h3>
                    </div>
                    <div className="flex items-center justify-end">
                        <h3>Back To Top</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
