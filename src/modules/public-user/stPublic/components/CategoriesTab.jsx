import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../../server/supabaseClient';
import { FaStar, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ScrollableContainer = ({ children, className = '' }) => {
    const containerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    

    const checkOverflow = () => {
        if (containerRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollWidth > clientWidth && scrollLeft + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        checkOverflow();
        const container = containerRef.current;
        container?.addEventListener('scroll', checkOverflow);
        window.addEventListener('resize', checkOverflow);

        return () => {
            container?.removeEventListener('scroll', checkOverflow);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [children]);

    const scroll = (direction) => {
        if (containerRef.current) {
            const container = containerRef.current;
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative w-full flex items-center">
            {showLeftArrow && (
                <button 
                    onClick={() => scroll('left')} 
                    className="absolute left-[0] z-[10] bg-[var(--primary-blue)] opacity-60 hover:opacity-100 rounded-full p-[1rem] shadow-[var(--shadow-md)]"
                >
                    <FaChevronLeft size={24} />
                </button>
            )}
            
            <div 
                ref={containerRef} 
                className={`flex overflow-x-hidden scroll-smooth ${className}`}
            >
                {children}  
            </div>
            
            {showRightArrow && (
                <button 
                    onClick={() => scroll('right')} 
                    className="absolute right-[0] z-[10] bg-[var(--primary-blue)] opacity-60 hover:opacity-100 rounded-full p-[1rem] shadow-[var(--shadow-md)]"
                >
                    <FaChevronRight size={24} />
                </button>
            )}
        </div>
    );
};

const CourseCard = ({ course }) => {
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

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

    return (
        <div className="relative group w-[40%] h-[80%] bg-[white] border border-[var(--primary-grey)] p-[0.5rem] rounded-[0.5rem] hover:shadow-(--shadow-md)">
            {/* Course Image */}
            <div className="w-full h-[200px]">
                <img 
                    src={course.media?.image || '/default-course-image.png'} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Course Details */}
            <div className="p-4">
                <h3 className="font-bold text-lg truncate">{course.title}</h3>
                <p className="text-sm text-gray-600 truncate">
                    {course.users?.first_name} {course.users?.last_name}
                </p>

                {/* Rating */}
                <div className="flex items-center mt-2">
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                            <FaStar 
                                key={index} 
                                color={index < Math.round(averageRating) ? '#FFD700' : '#E0E0E0'}
                            />
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                        ({averageRating.toFixed(1)} / {totalReviews} reviews)
                    </span>
                </div>

                {/* Price and Cart */}
                <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-lg">${course.price}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                            <FaShoppingCart />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CategoriesTab = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [courses, setCourses] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const navigate = useNavigate();

    // Fetch categories and initial data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetch categories
                const { data: categoriesData, error: categoriesError } = await supabase
                    .from('categories')
                    .select('*')
                    .eq('archived', false)
                    .order('name');

                if (categoriesError) throw categoriesError;

                setCategories(categoriesData);
                
                // Select first category by default
                if (categoriesData.length > 0) {
                    setSelectedCategory(categoriesData[0].id);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch sub-categories when category changes
    useEffect(() => {
        const fetchSubCategories = async () => {
            if (!selectedCategory) return;

            try {
                const { data: subCategoriesData, error } = await supabase
                    .from('sub_categories')
                    .select('*')
                    .eq('category_id', selectedCategory)
                    .eq('archived', false)
                    .order('name');

                if (error) throw error;

                setSubCategories(prev => ({
                    ...prev,
                    [selectedCategory]: subCategoriesData
                }));

                // Select first sub-category by default
                if (subCategoriesData.length > 0) {
                    setSelectedSubCategory(subCategoriesData[0].id);
                }
            } catch (error) {
                console.error('Error fetching sub-categories:', error);
            }
        };

        fetchSubCategories();
    }, [selectedCategory]);

    // Fetch courses for selected sub-category
    useEffect(() => {
        const fetchCourses = async () => {
            if (!selectedSubCategory) return;

            try {
                const { data: coursesData, error } = await supabase
                    .from('courses')
                    .select(`
                        *,
                        users:instructor_id (first_name, last_name)
                    `)
                    .eq('sub_category_id', selectedSubCategory)
                    .limit(4)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                setCourses(prev => ({
                    ...prev,
                    [selectedSubCategory]: coursesData
                }));
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [selectedSubCategory]);

    return (
        <div className="container w-full h-full mx-auto p-[0.5rem]">
            {/* Categories Tabs */}
            <ScrollableContainer className="space-x-[0.5rem] pb-2">
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`
                            whitespace-nowrap px-4 py-2 rounded-lg
                            ${selectedCategory === category.id 
                                ? 'bg-[var(--bg-white)] text-[var(--primary-black)] font-[500]' 
                                : 'bg-[var(--bg-white)] text-[var(--subCat-bg)] hover:text-[var(--primary-black)]'}
                        `}
                    >
                        {category.name}
                    </button>
                ))}
            </ScrollableContainer>
            
            <div className='divider w-full h-[1px] mb-[0.5rem] bg-[var(--primary-grey)]'></div>
            
            {/* Sub-Categories Tabs */}
            {selectedCategory && subCategories[selectedCategory] && (
                <ScrollableContainer className="mb-[0.5rem] space-x-[0.5rem] mt-[1rem]">
                    {subCategories[selectedCategory].map(subCategory => (
                        <button
                            key={subCategory.id}
                            onClick={() => setSelectedSubCategory(subCategory.id)}
                            className={`
                                px-[1rem] py-[1rem] rounded-full whitespace-nowrap
                                ${selectedSubCategory === subCategory.id 
                                    ? 'bg-[var(--subCat-bg)] text-[var(--bg-white)] font-[500]' 
                                    : 'bg-[var(--placeholder-grey)] text-[var(--subCat-bg)] hover:bg-[var(--primary-grey)]'}
                            `}
                        >
                            {subCategory.name}
                        </button>
                    ))}
                </ScrollableContainer>
            )}

            {/* Courses Display */}
                {selectedSubCategory && courses[selectedSubCategory] ? (
                    courses[selectedSubCategory].length === 0 ? (
                        <p className="text-center mt-[10rem]">No courses available in this category.</p>
                    ) : (
                        <>
                            <ScrollableContainer className="space-x-[0.5rem] pb-4">
                                {courses[selectedSubCategory].map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </ScrollableContainer>
                            <div className="text-center mt-[1rem]">
                                <button 
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                                    onClick={() => navigate(`/courses/${selectedCategory}`)}
                                >
                                    View All Courses in Category
                                </button>
                            </div>
                        </>
                    )
                ) : (
                    <p className="text-center mt-[10rem]">Select a sub-category to view courses.</p>
            )}


            {/* {selectedSubCategory && courses[selectedSubCategory] && (
                <ScrollableContainer className="space-x-[0.5rem] pb-4">
                    {courses[selectedSubCategory].map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </ScrollableContainer>
            )}
            {selectedSubCategory && courses[selectedSubCategory].length === 0 ? (
                <p className="text-center mt-[10rem]">No courses available in this category.</p>
            ) : (
                <div className="text-center mt-[1rem]">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => navigate(`/courses/${selectedCategory}`)}
                    >
                        View All Courses in Category
                    </button>
                </div>
            )} */}
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.object.isRequired,
};

ScrollableContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default CategoriesTab;