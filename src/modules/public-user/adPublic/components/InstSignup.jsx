import { useForm } from "react-hook-form"
import EmailIcon from '../../../../assets/icons/email.svg';
import PasswordIcon from '../../../../assets/icons/lock.svg';
import { MdChevronRight } from "react-icons/md";

const InstSignup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    return (
        <div className="w-[60%] h-[30%] flex flex-col gap-[1rem]">
            <h1 className="text-[2rem] font-[700] leading-[3rem]">Register to get started</h1>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className="form-container w-full flex flex-col items-center justify-center gap-[1rem]">
                    <div className="names w-full flex items-center justify-center gap-[1rem]">
                        <div className="firstname w-full">
                            <input {...register("firstname", { required: true })} placeholder="First Name" />
                            {errors.firstname && <p>First Name is required</p>}
                        </div>
                        <div className="lastname w-full">
                            <input {...register("lastname", { required: true })} placeholder="Last Name" />
                            {errors.lastname && <p>Last Name is required</p>}
                        </div>
                    </div>
                    <div className="email w-full">
                        <div className="email-field w-full flex items-center justify-center gap-[1rem]">
                            <img src={EmailIcon} alt="email" />
                            <input {...register("email", { required: true })} placeholder="Email" />
                        </div>
                        {errors.email && <p>Email is required</p>}
                    </div>
                    <div className="password w-full flex items-center justify-center gap-[1rem]">
                        <div className="password-field w-full flex items-center justify-center gap-[1rem]">
                            <img src={PasswordIcon} alt="password" />
                            <input {...register("password", { required: true })} placeholder="Password" />
                            {errors.password && <p>Password is required</p>}
                        </div>
                        <div className="confirm-password-field w-full flex items-center justify-center gap-[1rem]">
                            <img src={PasswordIcon} alt="confirm password" />
                            <input {...register("confirmPassword", { required: true })} placeholder="Confirm Password" />
                            {errors.confirmPassword && <p>Confirm Password is required</p>}
                        </div>
                    </div>
                    <button type="submit" className="w-full h-[3rem] rounded-[0.3rem] bg-[var(--primary-blue)] hover:bg-[var(--logo-blue)] text-[var(--bg-white)] flex items-center justify-center gap-[0.5rem]">
                        Create account
                        <MdChevronRight color="var(--bg-white)" size={25} />
                    </button>
                </div>
                <div className="tos w-full flex flex-col items-center justify-center">
                    <p className="text-[0.7rem] leading-[1.25rem]">
                        By confirming your email, you agree to our <span className="underline cursor-pointer">Terms of Service</span>
                    </p>
                    <p className="text-[0.7rem] leading-[1.25rem] mt-[-0.7rem]">
                        and that you have read and understood our <span className="underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default InstSignup
