// import React from 'react';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';

const Modal = ({
    isOpen, 
    onClose, 
    children, 
    title, 
    size = 'md', 
    className = '',
    closeOnOverlay = true
}) => {
    // Modal size configurations
    const sizeClasses = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'w-full h-full'
    };

    // Prevent event propagation to avoid closing modal
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    // Handle modal close
    const handleClose = () => {
        onClose();
    };

    // If modal is not open, return null
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto"
            onClick={closeOnOverlay ? handleClose : undefined}
        >
            <div 
                className={`
                    relative 
                    bg-white 
                    rounded-lg 
                    shadow-xl 
                    ${sizeClasses[size]} 
                    w-full 
                    mx-4 
                    ${className}
                `}
                onClick={handleContentClick}
            >
                {/* Modal Header */}
                {title && (
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <button 
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <MdClose size={24} />
                        </button>
                    </div>
                )}

                {/* Modal Content */}
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

// PropTypes for type checking
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'full']),
    className: PropTypes.string,
    closeOnOverlay: PropTypes.bool
};

export default Modal;