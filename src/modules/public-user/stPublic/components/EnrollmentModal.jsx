// import React from 'react';
import PropTypes from 'prop-types';

const EnrollmentModal = ({ isOpen, onClose, course, onEnroll }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-[0] flex items-center justify-center bg-[var(--primary-grey)] opacity-95 z-50">
            <div className="w-[30%] bg-[white] rounded-[0.5rem] p-[1.5rem]">
                <h2 className="text-[1.2rem] font-bold mb-[1rem]">Enroll in {course.title}</h2>
                {/* <p className="mb-2">Instructor: {instructor.first_name} {instructor.last_name}</p> */}
                <p className="mb-[1rem] text-center text-[1.2rem] bg-[var(--light-blue)] py-[0.5rem] rounded-[0.5rem]">Amount: ${course.price}</p>
                <div className="flex justify-between pb-[1rem]">
                    <button className="bg-red-500 text-white p-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white p-2 rounded" onClick={onEnroll}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

EnrollmentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    instructor: PropTypes.object,
    onEnroll: PropTypes.func
};

export default EnrollmentModal;