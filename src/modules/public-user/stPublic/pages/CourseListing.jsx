import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../../server/supabaseClient';
import { FaStar, FaFilter } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import EnrollmentModal from '../components/EnrollmentModal';

const CourseListItem = ({ course }) => {
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseRatings = async () => {
            try {
                const { data: reviews, error } = await supabase
                    .from('reviews')
                    .select('rating')
                    .eq('course_id', course.id);

                if (error) throw error;

                if (reviews.length > 0) {
                    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                    setAverageRating(avgRating);
                    setTotalReviews(reviews.length);
                }
            } catch (error) {
                console.error('Error fetching course ratings:', error);
            }
        };

        fetchCourseRatings();
    }, [course.id]);

    const handleEnroll = async () => {
        // Logic to check if user is logged in using supabase
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error('Error fetching user:', error);
            return;
        }

        if (!user) {
            // Redirect to login
            navigate('/login');
        } else {
            // Generate a bill in the billing table
            const { error } = await supabase
                .from('billing')
                .insert({
                    student_id: user.id,
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

    return (
        <div className="w-full h-[30%] flex items-start justify-start bg-[var(--bg-white)] border border-[var(--primary-grey)] rounded-[0.3rem] px-[1rem] overflow-hidden mb-4 shadow-[var(--shadow-md)] hover:shadow-lg transition-shadow">
            {/* Course Image */}
            <div className="w-[30%] h-[100%]">
                <img 
                    src={course.media?.image || '/default-course-image.png'} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Course Details */}
            <div className="w-[40%] flex-grow p-4 flex justify-between">
                <div className="flex-grow pr-4">
                    <h4 className="text-xl font-bold mb-2">{course.title}</h4>
                    <p className="text-[0.9rem] text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                    
                    {/* Instructor and Topic */}
                    <div className="text-[0.9rem] text-[var(--input-hero-text-p)] text-gray-500 mb-2">
                        <span className="text-[var(--text-grey)]">By {course.users?.first_name} {course.users?.last_name}</span>
                        {course.sub_categories && (
                            <span className="ml-[0.5rem] text-[var(--primary-blue)]">
                                • {course.sub_categories.name}
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center">
                        <div className="flex text-yellow-500 mr-2">
                            {[...Array(5)].map((_, index) => (
                                <FaStar 
                                    key={index} 
                                    color={index < Math.round(averageRating) ? '#FFD700' : '#E0E0E0'}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">
                            ({averageRating.toFixed(1)} / {totalReviews} reviews)
                        </span>
                    </div>
                </div>

                {/* Price and Cart */}
                <div className="w-[30%] py-[0.5rem] flex flex-col items-end justify-between">
                    <span className="bg-[var(--light-blue)] text-2xl p-[0.5rem] rounded-full font-bold text-green-600">${course.price}</span>
                    <div className='flex gap-[0.5rem]'>
                        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-[var(--logo-blue)]" onClick={() => navigate(`/course/${course.id}`)}>
                            Details
                        </button>
                        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-[var(--logo-blue)]" onClick={() => setIsModalOpen(true)}>
                            Enroll
                        </button>   
                    </div>
                </div>
            </div>
            <EnrollmentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                course={course} 
                instructor={course.users} 
                onEnroll={handleEnroll} 
            />
        </div>
    );
};

const CourseListing = () => {
    const [category, setCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filters, setFilters] = useState({
        subCategories: [],
        minRating: 0,
        maxPrice: null
    });

    // Get category ID from URL
    const { categoryId } = useParams();

    // Fetch category and courses
    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                // Fetch category details
                const { data: categoryData, error: categoryError } = await supabase
                    .from('categories')
                    .select('*')
                    .eq('id', categoryId)
                    .single();

                if (categoryError) throw categoryError;
                setCategory(categoryData);

                // Fetch sub-categories
                const { data: subCategoriesData, error: subCategoriesError } = await supabase
                    .from('sub_categories')
                    .select('*')
                    .eq('category_id', categoryId);

                if (subCategoriesError) throw subCategoriesError;
                setSubCategories(subCategoriesData);

                // Fetch courses
                const { data: coursesData, error: coursesError } = await supabase
                    .from('courses')
                    .select(`
                        *,
                        users:instructor_id (first_name, last_name),
                        sub_categories:sub_category_id (name)
                    `)
                    .eq('category_id', categoryId);

                if (coursesError) throw coursesError;
                setCourses(coursesData);
                setFilteredCourses(coursesData);
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        if (categoryId) {
            fetchCategoryDetails();
        }
    }, [categoryId]);

    // Apply filters
    useEffect(() => {
        let result = courses;

        // Filter by sub-categories
        if (filters.subCategories.length > 0) {
            result = result.filter(course => 
                filters.subCategories.includes(course.sub_category_id)
            );
        }

        // Filter by minimum rating
        if (filters.minRating > 0) {
            // This would require pre-calculating ratings or joining with reviews
            // For now, we'll skip this filter
        }

        // Filter by maximum price
        if (filters.maxPrice) {
            result = result.filter(course => course.price <= filters.maxPrice);
        }

        setFilteredCourses(result);
    }, [filters, courses]);

    // Filter handlers
    const handleSubCategoryFilter = (subCategoryId) => {
        setFilters(prev => ({
            ...prev,
            subCategories: prev.subCategories.includes(subCategoryId)
                ? prev.subCategories.filter(id => id !== subCategoryId)
                : [...prev.subCategories, subCategoryId]
        }));
    };

    const handleRatingFilter = (rating) => {
        setFilters(prev => ({
            ...prev,
            minRating: rating
        }));
    };

    const handlePriceFilter = (maxPrice) => {
        setFilters(prev => ({
            ...prev,
            maxPrice
        }));
    };

    return (
        <div className="container w-full mx-auto p-6">
            {/* Header */}
            <Header />
            <div className='w-full h-[1px] bg-[var(--primary-grey)]'></div>
            <div className="w-[80%] mx-auto mb-[2rem]">
                <h1 className="text-[2.5rem] font-bold text-[var(--inst-hero-text-h1)]">
                    {category?.name} Courses
                </h1>
                <p className="text-[var(--inst-hero-text-p)] mt-2">
                    Explore a wide range of {category?.name} courses tailored to your learning needs
                </p>
            </div>

            <div className="w-[80%] mx-auto grid grid-cols-4 gap-[0.5rem] mb-[2rem]">
                {/* Filter Pane */}
                <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FaFilter className="mr-2" /> Filters
                    </h3>
                    <div className='divider h-[1px] w-full bg-[var(--primary-grey)]'></div>

                    {/* Sub-Category Filter */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Sub-Categories</h4>
                        {subCategories.map(subCategory => (
                            <div key={subCategory.id} className="flex items-center mb-2">
                                <input 
                                    type="checkbox" 
                                    id={`subcat-${subCategory.id}`}
                                    checked={filters.subCategories.includes(subCategory.id)}
                                    onChange={() => handleSubCategoryFilter(subCategory.id)}
                                    className="mr-[0.5rem] border bg-[var(--bg-white)]"
                                />
                                <label htmlFor={`subcat-${subCategory.id}`}>
                                    {subCategory.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className='divider h-[1px] w-full bg-[var(--primary-grey)] mt-[1rem]'></div>

                    {/* Rating Filter */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Minimum Rating</h4>
                        {[4, 3, 2, 1].map(rating => (
                            <div key={rating} className="flex items-center mb-2">
                                <input 
                                    type="radio" 
                                    id={`rating-${rating}`}
                                    name="rating"
                                    checked={filters.minRating === rating}
                                    onChange={() => handleRatingFilter(rating)}
                                    className="mr-[0.5rem]"
                                />
                                <label htmlFor={`rating-${rating}`} className="flex items-center">
                                    {[...Array(rating)].map((_, i) => (
                                        <FaStar key={i} color="#FFD700" />
                                    ))}
                                    <span className="ml-2">& up</span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className='divider h-[1px] w-full bg-[var(--primary-grey)] mt-[1rem]'></div>

                    {/* Price Filter */}
                    <div>
                        <h4 className="font-medium mb-2">Price</h4>
                        {[50, 100, 200].map(price => (
                            <div key={price} className="flex items-center mb-2">
                                <input 
                                    type="radio" 
                                    id={`price-${price}`}
                                    name="price"
                                    checked={filters.maxPrice === price}
                                    onChange={() => handlePriceFilter(price)}
                                    className="mr-[0.5rem]"
                                />
                                <label htmlFor={`price-${price}`}>
                                    Up to ${price}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Courses Listing */}
                <div className="col-span-3">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <CourseListItem key={course.id} course={course} />
                        ))
                    ) : (
                        <div className="text-center text-gray-600 py-10">
                            No courses found matching your filters.
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

CourseListItem.propTypes = {
    course: PropTypes.object.isRequired,
    instructor: PropTypes.object
};

CourseListing.propTypes = {
    courses: PropTypes.array
};

export default CourseListing;