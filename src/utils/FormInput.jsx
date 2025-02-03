import React from 'react'
import PropTypes from 'prop-types';

const FormInput = ({
    type = 'text', 
    label, 
    name, 
    value, 
    onChange, 
    options = [], 
    placeholder = '', 
    required = false,
    className = '',
    error = '',
    rows = 7,
    icon = null
}) => {
    const baseInputClasses = "w-full px-[12px] py-[8px] bg-[var(--input-bg)] text-[var(--text-grey)] placeholder-[var(--text-grey)] text-[1rem] font-[400] border border-[var(--input-border)] rounded-[0.3rem]  focus:outline-none focus:ring-2 focus:ring-blue-500 box-border";
    const errorClasses = "border-red-500 text-red-900";

    const renderInput = () => {
        const inputWithIcon = (inputElement) => (
            <div className="relative w-full flex items-center">
                {icon && (
                    <div className="absolute left-3 pointer-events-none">
                        <img 
                            src={icon} 
                            alt={`${name} icon`} 
                            className="w-5 h-5 text-[var(--text-grey)]" 
                        />
                    </div>
                )}
                {React.cloneElement(inputElement, {
                    className: `${icon ? 'pl-[40px]' : ''} ${inputElement.props.className}`
                })}
            </div>
        );

        switch(type) {
            case 'text':
            case 'email':
            case 'password':
                return inputWithIcon(
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        className={`${baseInputClasses} ${error ? errorClasses : ''} ${className}`}
                    />
                );
            
            case 'textarea':
                return inputWithIcon(
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        rows={rows}
                        className={`${baseInputClasses} resize-y ${error ? errorClasses : ''} ${className}`}
                    />
                );
            
            case 'select':
                return inputWithIcon(
                    <div className="relative w-full">
                        <select
                            name={name}
                            value={value}
                            onChange={onChange}
                            required={required}
                            className={`${baseInputClasses} appearance-none ${error ? errorClasses : ''} ${className}`}
                        >
                            {/* <option value="">Select {label}</option> */}
                            {options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--text-grey)]">
                            <svg className="fill-current h-[0.5rem] w-[0.5rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                );
            
            case 'file':
                return inputWithIcon(
                    <div className="relative w-full">
                        <input
                            type="file"
                            name={name}
                            onChange={onChange}
                            required={required}
                            id={name}
                            className={`${baseInputClasses} file:hidden absolute inset-0 opacity-0 cursor-pointer z-10 ${className}`}
                        />
                        <label 
                            htmlFor={name} 
                            className={`${baseInputClasses} flex items-center justify-between cursor-pointer ${className}`}
                        >
                            <span className="bg-[var(--input-upload-bg)] text-[var(--text-grey)] px-[0.5rem] py-[0.2rem] rounded-[0.2rem]">
                            {icon && (
                                <img 
                                    src={icon} 
                                    alt={`${name} icon`} 
                                    className="w-5 h-5 mr-2 text-[var(--text-grey)]" 
                                />
                            )}
                                Upload image
                            </span>
                            <span className="text-[var(--text-grey)]">
                                {placeholder || 'Choose file'}
                            </span>
                        </label>
                    </div>
                );
            
            case 'button':
                return inputWithIcon(
                    <button
                        type="submit"
                        name={name}
                        onClick={onChange}
                        className={`bg-[var(--primary-blue)] text-[1rem] leading-[1.5rem] text-[var(--bg-white)] py-[0.7rem] px-[1.5rem] rounded-[0.3rem] hover:opacity-90 transition-opacity duration-300  ${className}`}
                    >
                        {label}
                    </button>
                );
            
            default:
                return null;
        }
    };

    return (
        <div className="mb-4">
            {label && type !== 'button' && (
                <label 
                    htmlFor={name} 
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {label}
                </label>
            )}
            {renderInput()}
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

FormInput.propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password', 'select', 'file', 'button', 'textarea']),
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string, 
        PropTypes.number,
        PropTypes.array
    ]),
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
        })
    ),
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.string,
    rows: PropTypes.number,
    icon: PropTypes.string
};

export default FormInput;