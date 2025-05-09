import LaunchImage from '../../../../assets/launch.svg'

const LaunchCourse = () => {
    return (
        <div className='w-[100%] h-[100%] flex items-center justify-center'>
            <div className='left w-[30%] h-[100%] flex flex-col items-start justify-between'>
                <p>
                    Gather your first ratings and reviews by promoting your course through social media and your professional networks.<br/>
                    Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.
                </p>
                <h3>How we help you</h3>
                <p>
                Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses. There’s even more opportunity for courses chosen for GClient Business.
                </p>
            </div>
            <div className='right w-[60%] h-[100%] flex items-center justify-center'>
                <img src={LaunchImage} alt="Record" className='w-[75%]' />
            </div>
        </div>
    )
}

export default LaunchCourse
