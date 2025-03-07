// import React from 'react';
import { supabase } from '../../../../server/supabaseClient';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from '../../../../routing/routes';
import { toast } from 'react-toastify';

const EnrollmentModal = ({ isOpen, onClose, course }) => {
    const navigate = useNavigate();

    const handleEnroll = async () => {
        // Logic to check if user is logged in using supabase
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error('Error fetching user:', error);
            return;
        }

        if (!session) {
            // Redirect to login
            toast.error('You must be logged in to enroll in a course');
            navigate(ROUTES.COMMON.STAUTH);
        } else {
            // Generate a bill in the billing table
            const { error } = await supabase
                .from('billing')
                .insert({
                    student_id: session.user.id,
                    course_id: course.id,
                    instructor_id: course.instructor_id,
                    amount: course.price,
                });

            if (error) {
                console.error('Error creating billing record:', error);
            } else {
                // Open order confirmation modal

                // Implement order confirmation logic here
            }
        }
    };

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
                    <button className="bg-blue-500 text-white p-2 rounded" onClick={handleEnroll}>
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
    instructor: PropTypes.object
};

export default EnrollmentModal;