import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routing/routes";

const Otp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    //get data from submitted form in local storage
    const formData = JSON.parse(localStorage.getItem('formData'));
    const email = formData.email;
    console.log('user email:',email)



    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        navigate(ROUTES.STUDENT.DASHBOARD)
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-[2rem]">
            <div className="flex flex-col items-center justify-center">
                <p className="text-[1rem]">Enter the verification code we sent to your email </p>
                <p className="font-[600] text-[1rem] mt-[-0.5rem]">{email && email}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[70%] flex flex-col gap-[2rem]">
                <div className="w-full h-[3rem] flex flex-col">
                    <div className="w-[96%] h-fit flex items-center gap-[0.5rem] bg-[var(--input-bg)] border-b-[1px] border-[var(--primary-blue)] rounded-t-[0.3rem] p-[0.5rem]">
                        <input type="text" 
                            {...register("otp", { required: "OTP is required" })} 
                            aria-invalid={errors.otp ? "true" : "false"}
                            placeholder="123456"
                            className="w-[100%] text-center bg-transparent border-none outline-none text-[1rem] text-[var(--text-grey)]"
                        />
                    </div>
                    {errors.otp && <p className='error-message text-[0.7rem] text-[var(--primary-red)]'>{errors.otp.message}</p>}
                </div>
                <button type="submit" className="w-full h-[2.5rem] bg-[var(--primary-blue)] rounded-[0.3rem] text-[1rem] text-[var(--bg-white)]">
                    Verify
                </button>
            </form>
        </div>
    )
}

export default Otp
