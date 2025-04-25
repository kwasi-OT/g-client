import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../server/supabaseClient';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import CourseModal from './CourseModal';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const fetchInstructorCourses = useCallback(async () => {
        try {
            // Fetch current user
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                toast.error('User not authenticated');
                console.error('User not authenticated');
                setLoading(false);
                return;
            }

            // Fetch instructor details
            const { data: instructorData, error: instructorError } = await supabase
                .from('users')
                .select('*')
                .eq('auth_id', user.id)
                .single();

            if (instructorError) {
                toast.error('Failed to fetch instructor details');
                console.error('Failed to fetch instructor details', instructorError);
                setLoading(false);
                return;
            }

            // Fetch courses for this instructor with category info
            const { data: coursesData, error: coursesError } = await supabase
                .from('courses')
                .select(`
                    *,
                    categories (name),
                    sub_categories (name),
                    enrollments (count)
                `)
                .eq('instructor_id', instructorData.id);

            if (coursesError) {
                toast.error('Failed to fetch courses');
                console.error('Failed to fetch courses', coursesError);
                setLoading(false);
                return;
            }

            // Transform courses data to include enrollment count
            const processedCourses = coursesData.map(course => ({
                ...course,
                enrollmentCount: course.enrollments[0]?.count || 0
            }));

            setCourses(processedCourses);
            setLoading(false);
        } catch (error) {
            toast.error('An unexpected error occurred');
            console.error('An unexpected error occurred', error);
            setLoading(false);
        }
    }, [setCourses, setLoading]);

    useEffect(() => {
        fetchInstructorCourses();
    }, [fetchInstructorCourses]);

    // handle edit course
    const handleEditCourse = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const handleViewCourse = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };
    
    // handle create course
    const handleCreateCourse = () => {
        setSelectedCourse(null);
        setIsModalOpen(true);
    };

    const handleModalSubmit = () => {
        // Refresh courses list
        fetchInstructorCourses();
    };

    const handleDeleteCourse = async (courseId) => {
        // Check if course has any enrollments
        const { count: enrollmentCount } = await supabase
            .from('enrollments')
            .select('*', { count: 'exact' })
            .eq('course_id', courseId);

        if (enrollmentCount > 0) {
            toast.error('Cannot delete course with active enrollments');
            return;
        }

        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', courseId);

        if (error) {
            toast.error('Failed to delete course');
        } else {
            toast.success('Course deleted successfully');
            setCourses(courses.filter(course => course.id !== courseId));
        }
    };

    if (loading) {
        return <div>Loading courses...</div>;
    }

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
            {courses.length === 0 ? (
                <div className="text-center py-10 bg-gray-100 rounded-lg">
                    <p className="text-gray-600 text-[1.2rem]">
                        You haven&apos;t created any courses yet
                    </p>
                    <p 
                        className="text-[1.5rem] text-[var(--primary-blue)] hover:underline mt-[1rem] cursor-pointer"
                        onClick={handleCreateCourse}
                    >
                        Create your first course
                    </p>
                </div>
            ) : (
                <>
                    <button 
                        onClick={handleCreateCourse}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Create New Course
                    </button>
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-3 text-left">Title</th>
                                <th className="border p-3 text-left">Category</th>
                                <th className="border p-3 text-left">Sub Category</th>
                                <th className="border p-3 text-left">Description</th>
                                <th className="border p-3 text-center">Enrolled Students</th>
                                <th className="border p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="border p-3">{course.title}</td>
                                    <td className="border p-3">{course.categories?.name || 'Uncategorized'}</td>
                                    <td className="border p-3">{course.sub_categories?.name || 'Uncategorized'}</td>
                                    <td className="border p-3 truncate max-w-[200px]">
                                        {course.description.length > 50 
                                            ? `${course.description.slice(0, 50)}...` 
                                            : course.description}
                                    </td>
                                    <td className="border p-3 text-center">{course.enrollmentCount}</td>
                                    <td className="border p-3 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button 
                                                className="text-blue-500 hover:text-blue-700"
                                                title="View Course Details"
                                                onClick={() => handleViewCourse(course)}
                                            >
                                                <FaEye size={20} />
                                            </button>
                                            <button 
                                                className="text-green-500 hover:text-green-700"
                                                title="Edit Course"
                                                onClick={() => handleEditCourse(course)}
                                            >
                                                <FaEdit size={20} />
                                            </button>
                                            <button 
                                                className={`${course.enrollmentCount === 0 ? 'text-red-500 hover:text-red-700' : 'text-gray-300 cursor-not-allowed'}`}
                                                title={course.enrollmentCount === 0 ? 'Delete Course' : 'Cannot delete course with enrollments'}
                                                disabled={course.enrollmentCount > 0}
                                                onClick={() => handleDeleteCourse(course.id)}
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <CourseModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courseData={selectedCourse}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
};

export default Courses;