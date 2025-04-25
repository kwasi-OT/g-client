import React, { useState, useEffect } from 'react';
import { supabase } from '../../../server/supabaseClient';
import { toast } from 'react-toastify';

const CourseModal = ({ 
    isOpen, 
    onClose, 
    courseData = null, 
    onSubmit 
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        overview: '',
        requirements: '',
        category_id: '',
        table_of_contents: ''
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*');
            
            if (data) setCategories(data);
        };

        // Populate form if editing existing course
        if (courseData) {
            setFormData({
                title: courseData.title || '',
                description: courseData.description || '',
                overview: courseData.overview || '',
                requirements: courseData.requirements || '',
                category_id: courseData.category_id || '',
                table_of_contents: courseData.table_of_contents || ''
            });
        }

        fetchCategories();
    }, [courseData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get current instructor
            const { data: { user } } = await supabase.auth.getUser();
            const { data: instructorData } = await supabase
                .from('users')
                .select('id')
                .eq('auth_id', user.id)
                .single();

            const coursePayload = {
                ...formData,
                instructor_id: instructorData.id
            };

            let result;
            if (courseData) {
                // Update existing course
                result = await supabase
                    .from('courses')
                    .update(coursePayload)
                    .eq('id', courseData.id);
                
                toast.success('Course updated successfully');
            } else {
                // Create new course
                result = await supabase
                    .from('courses')
                    .insert(coursePayload);
                
                toast.success('Course created successfully');
            }

            if (result.error) throw result.error;
            
            onSubmit();
            onClose();
        } catch (error) {
            toast.error(`Failed to ${courseData ? 'update' : 'create'} course: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                    {courseData ? 'Edit Course' : 'Create New Course'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Course Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Category</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option 
                                    key={category.id} 
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Course Overview</label>
                        <textarea
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Requirements</label>
                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Table of Contents</label>
                        <textarea
                            name="table_of_contents"
                            value={formData.table_of_contents}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {loading ? 'Saving...' : (courseData ? 'Update Course' : 'Create Course')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseModal;