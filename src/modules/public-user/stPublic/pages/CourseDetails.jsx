import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../../server/supabaseClient';
import { FaStar, FaChalkboardTeacher, FaClock, FaBook, FaTag, FaRegAddressCard } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const CourseDetails = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [instructor, setInstructor] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [category, setCategory] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [courseReviews, setCourseReviews] = useState([]);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // Fetch course details
                const { data: courseData, error: courseError } = await supabase
                    .from('courses')
                    .select('*')
                    .eq('id', courseId)
                    .single();

                if (courseError) throw courseError;
                setCourse(courseData);

                // Fetch instructor details
                if (courseData.instructor_id) {
                    const { data: instructorData, error: instructorError } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', courseData.instructor_id)
                        .single();

                    if (instructorError) throw instructorError;
                    setInstructor(instructorData);
                }

                // Fetch sub-category details
                if (courseData.sub_category_id) {
                    const { data: subCategoryData, error: subCategoryError } = await supabase
                        .from('sub_categories')
                        .select('*, categories(name)')
                        .eq('id', courseData.sub_category_id)
                        .single();

                    if (subCategoryError) throw subCategoryError;
                    setSubCategory(subCategoryData);
                    setCategory(subCategoryData.categories);
                }

                // Fetch reviews for the course
                const { data: reviewsData, error: reviewsError } = await supabase
                    .from('reviews')
                    .select('*, users:student_id(*)')
                    .eq('course_id', courseId);

                if (reviewsError) throw reviewsError;
                setCourseReviews(reviewsData);

                // Calculate average rating
                if (reviewsData.length > 0) {
                    const avgRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;
                    setAverageRating(avgRating);
                    setTotalReviews(reviewsData.length);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
                navigate('/courses');
            }
        };

        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId, navigate]);

    if (!course) return <div>Loading...</div>;

    return (
        <div className="w-full min-h-screen bg-[var(--bg-white)]">
            <Header />
            <div className='w-full h-[1px] bg-[var(--primary-grey)]'></div>
            
            <div className="container w-[80%] mx-auto py-[2rem]">
                {/* Course Header */}
                <div className="grid grid-cols-1 gap-[2rem] mb-[2rem]">
                    {/* Course Image */}
                    <div className="w-full h-[300px] rounded-[0.5rem] overflow-hidden shadow-[var(--shadow-md)]">
                        <img 
                            src={course.media?.image || '/default-course-image.png'} 
                            alt={course.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Course Details */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-[2rem] font-bold text-[var(--inst-hero-text-h1)] mb-[1rem]">
                                {course.title}
                            </h1>
                            
                            <div className="flex items-center mb-[1rem]">
                                <div className="flex text-yellow-500 mr-[0.5rem]">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar 
                                            key={index} 
                                            color={index < Math.round(averageRating) ? '#FFD700' : '#E0E0E0'}
                                        />
                                    ))}
                                </div>
                                <span className="text-[var(--text-grey)]">
                                    ({averageRating.toFixed(1)} / {totalReviews} reviews)
                                </span>
                            </div>

                            <div className="mb-[1rem]">
                                <p className="text-[var(--inst-hero-text-p)] mb-[0.5rem]">
                                    {course.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-[1rem] mb-[1rem]">
                                <div className="flex items-center">
                                    <FaChalkboardTeacher className="mr-[0.5rem] text-[var(--primary-blue)]" />
                                    <span>
                                        Instructor: {instructor 
                                            ? `${instructor.first_name} ${instructor.last_name}` 
                                            : 'Not specified'}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <FaBook className="mr-[0.5rem] text-[var(--primary-blue)]" />
                                    <span>
                                        Category: {category?.name || 'Not specified'}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <FaClock className="mr-[0.5rem] text-[var(--primary-blue)]" />
                                    <span>Duration: {course.duration || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaTag className="mr-[0.5rem] text-[var(--primary-blue)]" />
                                    <span>
                                        Sub-Category: {subCategory?.name || 'Not specified'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[2rem] font-bold text-green-600">
                                    ${course.price}
                                </span>
                                <button 
                                    className="flex items-center bg-[var(--primary-blue)] text-white px-[1rem] py-[0.5rem] rounded-[0.3rem] hover:bg-[var(--logo-blue)] transition"
                                >
                                    <FaRegAddressCard className="mr-[0.5rem]" /> Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Curriculum Overview */}
                <div className="mb-[2rem]">
                    <h2 className="text-[2rem] font-bold text-[var(--inst-hero-text-h1)] mb-[1rem]">
                        Course Curriculum
                    </h2>
                    <div className="bg-white shadow-[var(--shadow-md)] rounded-[0.5rem] p-[1rem]">
                        {course.curriculum ? (
                            <ul className="list-disc pl-[2rem]">
                                {JSON.parse(course.table_of_contents).map((section, index) => (
                                    <li key={index} className="mb-[0.5rem]">
                                        {section.title}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[var(--text-grey)]">Curriculum details not available</p>
                        )}
                    </div>
                </div>

                {/* Instructor Details */}
                {instructor && (
                    <div className="mb-[2rem]">
                        <h2 className="text-[2rem] font-bold text-[var(--inst-hero-text-h1)] mb-[1rem]">
                            Instructor
                        </h2>
                        <div className="flex gap-[1rem] items-center bg-white shadow-[var(--shadow-md)] rounded-[0.5rem] p-[0.5rem]">
                            <div className="w-[150px] h-[150px] rounded-full overflow-hidden mr-[1rem]">
                                <img 
                                    src={instructor.profile_picture || '/default-avatar.png'} 
                                    alt={`${instructor.first_name} ${instructor.last_name}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className='flex justify-between items-start gap-[1.5rem]'>
                                <div>
                                    <h3 className="text-[1.5rem] font-bold">
                                        {instructor.first_name} {instructor.last_name}
                                    </h3>
                                    <p className="text-[var(--text-grey)]">
                                        {instructor.bio || 'No instructor bio available'}
                                    </p>
                                </div>
                                <div>
                                    <h3>Education</h3>
                                    <p className="text-[var(--text-grey)]">
                                        {instructor.education || 'No education available'}
                                    </p>
                                </div>
                                <div>
                                    <h3>Skills</h3>
                                    <p className="text-[var(--text-grey)]">
                                        {instructor.skills || 'No skills available'}
                                    </p>
                                </div>
                                <div>
                                    <h3>Certifications</h3>
                                    <p className="text-[var(--text-grey)]">
                                        {instructor.certifications || 'No certifications available'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews Section */}
                <div>
                    <h2 className="text-[2rem] font-bold text-[var(--inst-hero-text-h1)] mb-[1rem]">
                        Student Reviews
                    </h2>
                    {courseReviews.length > 0 ? (
                        <div className="grid grid-cols-2 gap-[1rem]">
                            {courseReviews.map(review => (
                                <div 
                                    key={review.id} 
                                    className="bg-white shadow-[var(--shadow-md)] rounded-[0.5rem] p-[1rem]"
                                >
                                    <div className="flex items-center mb-[0.5rem]">
                                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden mr-[0.5rem]">
                                            <img 
                                                src={review.users?.avatar || '/default-avatar.png'} 
                                                alt={`${review.users?.first_name} ${review.users?.last_name}`} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">
                                                {review.users?.first_name} {review.users?.last_name}
                                            </h4>
                                            <div className="flex">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <FaStar key={i} color="#FFD700" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[var(--text-grey)]">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-[var(--text-grey)]">
                            No reviews yet for this course
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

CourseDetails.propTypes = {
    courseId: PropTypes.string
};

export default CourseDetails;