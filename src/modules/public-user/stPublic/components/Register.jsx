import { useState } from 'react';
import FormInput from '../../../../utils/FormInput';
import DollerSignIcon from '../../../../assets/icons/circle-dollar-sign.svg';
import GradHutIcon from '../../../../assets/icons/gradHat.svg';
import PeopleIcon from '../../../../assets/icons/people.svg';
import PhoneIcon from '../../../../assets/icons/phone.svg';
import UserIcon from '../../../../assets/icons/userOutline.svg';
import ImageIcon from '../../../../assets/icons/imageph.svg';
import EmailIcon from '../../../../assets/icons/email.svg';
import LocationIcon from '../../../../assets/icons/Location.svg';
// import CheveronRightIcon from '../../../../assets/icons/chevron.svg'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        module: '',
        disabled: '',
        location: '',
        gender: '',
        phone: '',
        amount: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-[50%] flex flex-col gap-[1.5rem] p-6 bg-[var(--bg-white)] rounded-lg ">
            <h1 className='text-[2.5rem] leading-[3rem] text-center font-[700]'>Register</h1>
            <div className='w-full flex justify-between items-center gap-[2rem]'>
                <div className='w-[45%] flex flex-col justify-center gap-[1.5rem]'>
                    <FormInput
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        icon={UserIcon}
                        className='w-full'
                    />
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        icon={EmailIcon}
                        className='w-full'
                    />
                    <FormInput
                        type="select"
                        name="module"
                        placeholder="Choose Module"
                        value={formData.module}
                        onChange={handleChange}
                        options={[
                            {value: '', label: 'Choose Module'},
                            { value: 'module1', label: 'Module 1' },
                            { value: 'module2', label: 'Module 2' },
                            { value: 'module3', label: 'Module 3' }
                        ]}
                        required
                        icon={GradHutIcon}
                        className='w-full'
                    />
                    <FormInput
                        type="select"
                        name="disabled"
                        placeholder="Disabled"
                        value={formData.disabled}
                        onChange={handleChange}
                        options={[
                            {value: '', label: 'Disabled?'},
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' }
                        ]}
                        required
                        icon={PeopleIcon}
                        className='w-full'
                    />
                </div>
                <div className='w-[45%] flex flex-col justify-center gap-[1.5rem]'>
                    <FormInput
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        icon={UserIcon}
                        className='w-full'
                    />
                    <FormInput
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        icon={LocationIcon}
                        className='w-full'
                    />
                    <FormInput
                        type="select"
                        name="gender"
                        placeholder="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' }
                        ]}
                        required
                        icon={UserIcon}
                        className='w-full'
                    />
                    <FormInput
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        icon={PhoneIcon}
                        className='w-full'
                    />
                </div>
            </div>
            <div className='w-full flex flex-col gap-[1.5rem]'>
                <FormInput
                    type="file"
                    name="uploadImage"
                    placeholder="Browse"
                    onChange={handleChange}
                    icon={ImageIcon}
                    className='w-full'
                />
                <FormInput
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    icon={DollerSignIcon}
                    className='w-full'
                />
                <FormInput
                    type="textarea"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={7} 
                    className='w-full'
                />
                <FormInput
                    type="button"
                    name="submit"
                    label="Register"
                    onChange={handleSubmit}
                    className='w-full'
                />
            </div>
        </form>
    );
};

export default Register;