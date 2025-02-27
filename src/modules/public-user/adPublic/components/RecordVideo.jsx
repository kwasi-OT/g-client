import RecordImage from '../../../../assets/record.svg'

const RecordVideo = () => {
    return (
        <div className='w-[100%] h-[100%] flex items-center justify-center'>
            <div className='left w-[30%] h-[100%] flex flex-col items-start justify-between'>
                <p>
                    Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start.<br/>
                    If you don’t like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.
                </p>
                <h3>How we help you</h3>
                <p>
                    Our support team is available to help you throughout the process and provide feedback on test videos.
                </p>
            </div>
            <div className='right w-[60%] h-[100%] flex items-center justify-center'>
                <img src={RecordImage} alt="Record" className='w-[75%]' />
            </div>
        </div>
    )
}

export default RecordVideo
