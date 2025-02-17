import Logo from '../../../../assets/footer-logo.png'
import LeftSectionImg from '../../../../assets/left-section-down.svg'
import WavesImg from '../../../../assets/waves.svg'

const InstAuth = () => {
    return (
        <div className='w-full h-[100vh] flex'>
            <div className="authLeft w-[40%] h-full bg-[var(--primary-blue)]">
                <div className="top w-[100%] h-[50%]">
                    <img src={Logo} alt="Logo" className="w-[50%] h-[10%] object-contain" />
                    <h1 className="text-[2rem] font-bold text-[white]">
                        Create Your Account to Manage and Access the Dashboard Effortlessly.
                    </h1>
                </div>
                <div className="middle w-[100%] h-[36%] absolute top-[30%] right-[30%]">
                    <img src={WavesImg} alt="waves image" className="w-[100%] h-[100%] object-contain" />
                </div>
                <div className="bottom w-[100%] h-[50%]">
                    <img src={LeftSectionImg} alt="left section image" className="w-[100%] h-[100%] object-contain" />
                </div>
            </div>
            <div className="authRight w-[60%] h-[100%] bg-[var(--bg-white)]"></div>
        </div>
    )
}

export default InstAuth
