// import React from 'react'

const MetricSection = () => {
    return (
        <div className="w-full h-[6rem] bg-[var(--primary-blue)] pt-[2%] pb-[3%] flex flex-col items-center justify-center">
            <div className="w-[80%] h-[80%] flex items-center justify-center gap-[10%]">
                <div className="flex flex-col items-center justify-center">
                    <h2 className='text-[var(--bg-white)] text-[2.5rem]'>100K+</h2>
                    <p className='text-[var(--bg-white)] mt-[-1rem]'>Students</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className='text-[var(--bg-white)] text-[2.5rem]'>500K+</h2>
                    <p className='text-[var(--bg-white)] mt-[-1rem]'>Enrollments</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className='text-[var(--bg-white)] text-[2.5rem]'>100+</h2>
                    <p className='text-[var(--bg-white)] mt-[-1rem]'>Countries</p>
                </div>
            </div>
        </div>
    )
}

export default MetricSection
