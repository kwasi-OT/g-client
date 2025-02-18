import { useForm } from "react-hook-form"

const InstSignup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    return (
        <div>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className="form-container">
                <input {...register("email", { required: true })} placeholder="Email" />
                {errors.email && <p>Email is required</p>}
                <input {...register("password", { required: true })} placeholder="Password" />
                {errors.password && <p>Password is required</p>}
                <button type="submit">Submit</button>
                </div>
                <div className="tos w-full flex flex-col items-center justify-center">
                    <p className="text-[0.7rem] leading-[1.25rem]">
                        By confirming your email, you agree to our <span className="underline cursor-pointer">Terms of Service</span>
                    </p>
                    <p className="text-[0.7rem] leading-[1.25rem]">
                        and that you have read and understood our <span className="underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default InstSignup
