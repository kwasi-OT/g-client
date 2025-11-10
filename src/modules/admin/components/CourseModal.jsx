import { useState, useEffect } from 'react';
import { supabase } from '../../../server/supabaseClient';
import { toast } from 'react-toastify';
import {
    FaCloudUploadAlt,
    FaFilePdf,
    FaFileImage,
    FaFileVideo,
    FaFileAlt,
    FaTimes
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

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
        price: '',
        requirements: '',
        category_id: '',
        sub_category_id: '',
        table_of_contents: '',
        media: []
    });
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [previewMode, setPreviewMode] = useState(false);

    useEffect(() => {
        // Fetch categories and subcategories
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*');
            
            if (data) setCategories(data);
            if (error) {
                toast.error('Failed to fetch categories');
                console.error('Failed to fetch categories', error);
            }

            const { data: subCategoriesData, error: subCategoriesError } = await supabase
                .from('sub_categories')
                .select('*');
            
            if (subCategoriesData) setSubCategories(subCategoriesData);
            if (subCategoriesError) {
                toast.error('Failed to fetch subcategories');
                console.error('Failed to fetch subcategories', subCategoriesError);
            }
        };

        // Populate form if editing existing course
        if (courseData) {
            setFormData({
                title: courseData.title || '',
                description: courseData.description || '',
                overview: courseData.overview || '',
                price: courseData.price || '',
                requirements: courseData.requirements || '',
                category_id: courseData.category_id || '',
                table_of_contents: courseData.table_of_contents || '',
                media: courseData.media || []
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

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadPromises = files.map(async (file) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const filePath = `course-media/${fileName}`;

            try {
                setUploadProgress(prev => ({
                    ...prev,
                    [file.name]: 0
                }));

                const { error } = await supabase.storage
                    .from('gclient-store')
                    .upload(filePath, file);

                if (error) throw error;

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('gclient-store')
                    .getPublicUrl(filePath);

                return {
                    name: file.name,
                    type: file.type,
                    url: publicUrl
                };
            } catch (error) {
                toast.error(`Upload failed for ${file.name}: ${error.message}`);
                return null;
            }
        });

        const uploadedFiles = await Promise.all(uploadPromises);
        const validFiles = uploadedFiles.filter(file => file !== null);

        setFormData(prev => ({
            ...prev,
            media: [
                ...prev.media,
                ...validFiles
            ]
        }));
    };

    if (uploadProgress) {
        <p>Uploading</p>
    }

    const removeFile = (fileToRemove) => {
        setFormData(prev => ({
            ...prev,
            media: prev.media.filter(
                file => file.name !== fileToRemove.name
            )
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

    const getFileIcon = (fileType) => {
        if (fileType.includes('pdf')) return <FaFilePdf />;
        if (fileType.includes('image')) return <FaFileImage />;
        if (fileType.includes('video')) return <FaFileVideo />;
        return <FaFileAlt />;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-[0] z-[50] flex items-center justify-center bg-[var(--bg-white)] opacity-[90%]">
            <div className="bg-[var(--bg-white)] rounded-5 w-[50rem] p-[0.5rem] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {courseData ? 'Edit Course' : 'Create New Course'}
                    </h2>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setPreviewMode(!previewMode)}
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            {previewMode ? 'Edit' : 'Preview'}
                        </button>
                    </div>
                </div>

                {previewMode ? (
                    <div className="preview-section">
                        <h3 className="text-xl font-semibold mb-4">{formData.title}</h3>
                        <p>{formData.category_id}</p>
                        <p>{formData.sub_category_id}</p>
                        <p className="mb-4">{formData.description}</p>
                        
                        <div className="mb-4">
                            <h4 className="font-bold">Course Overview</h4>
                            <p>{formData.overview}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-bold">Price</h4>
                            <p>{formData.price}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-bold">Requirements</h4>
                            <p>{formData.requirements}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-bold">Course Materials</h4>
                            <div className="grid grid-cols-3 gap-4">
                                {formData.media.map((file, index) => (
                                    <div 
                                        key={index} 
                                        className="border rounded p-2 flex items-center"
                                    >
                                        {getFileIcon(file.type)}
                                        <span className="ml-2 truncate">{file.name}</span>
                                        <a 
                                            href={file.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="ml-auto text-blue-500"
                                        >
                                            View
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
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
                            <label className="block mb-2">Sub Category</label>
                            <select
                                name="sub_category_id"
                                value={formData.sub_category_id}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="">Select Sub Category</option>
                                {subCategories.map(subCategory => (
                                    <option 
                                        key={subCategory.id} 
                                        value={subCategory.id}
                                    >
                                        {subCategory.name}
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
                        <div className="mb-4">
                            <label className="block mb-2">Course Materials</label>
                            <div className="border-2 border-dashed p-4 text-center">
                                <input 
                                    type="file" 
                                    multiple 
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label 
                                    htmlFor="file-upload" 
                                    className="cursor-pointer flex items-center justify-center"
                                >
                                    <FaCloudUploadAlt className="mr-2" size={24} />
                                    Upload Files
                                </label>
                            </div>
                            
                            {formData.media.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {formData.media.map((file, index) => (
                                        <div 
                                            key={index} 
                                            className="border rounded p-2 flex items-center"
                                        >
                                            {getFileIcon(file.type)}
                                            <span className="ml-2 truncate">{file.name}</span>
                                            <button 
                                                type="button"
                                                onClick={() => removeFile(file)}
                                                className="ml-auto text-red-500"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Rest of the form */}
                        <div className="flex justify-center gap-[0.5rem] mt-[2rem]">
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
                )}
            </div>
        </div>
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        //     <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        //         <h2 className="text-2xl font-bold mb-4">
        //             {courseData ? 'Edit Course' : 'Create New Course'}
        //         </h2>
        //         <form onSubmit={handleSubmit}>
        //             <div className="mb-4">
        //                 <label className="block mb-2">Course Title</label>
        //                 <input
        //                     type="text"
        //                     name="title"
        //                     value={formData.title}
        //                     onChange={handleChange}
        //                     className="w-full border rounded p-2"
        //                     required
        //                 />
        //             </div>
        //             <div className="mb-4">
        //                 <label className="block mb-2">Description</label>
        //                 <textarea
        //                     name="description"
        //                     value={formData.description}
        //                     onChange={handleChange}
        //                     className="w-full border rounded p-2"
        //                     required
        //                 />
        //             </div>
        //             <div className="mb-4">
        //                 <label className="block mb-2">Category</label>
        //                 <select
        //                     name="category_id"
        //                     value={formData.category_id}
        //                     onChange={handleChange}
        //                     className="w-full border rounded p-2"
        //                     required
        //                 >
        //                     <option value="">Select Category</option>
        //                     {categories.map(category => (
        //                         <option 
        //                             key={category.id} 
        //                             value={category.id}
        //                         >
        //                             {category.name}
        //                         </option>
        //                     ))}
        //                 </select>
        //             </div>
        //             <div className="mb-4">
        //                 <label className="block mb-2">Course Overview</label>
        //                 <textarea
        //                     name="overview"
        //                     value={formData.overview}
        //                     onChange={handleChange}
        //                     className="w-full border rounded p-2"
        //                 />
        //             </div>
        //             <div className="mb-4">
        //                 <label className="block mb-2">Requirements</label>
        //                 <textarea
        //                     name="requirements"
        //                     value={formData.requirements}
        //                     onChange={handleChange}
        //                     className="w-full border rounded p-2"
        //                 />
        //             </div>
        //             <div className="mb-4">
        //                 <label className="block mb-2">Table of Contents</label>
        //                 <textarea
        //                     name="table_of_contents"
        //                     value={formData.table_of_contents}
        //                     onChange={handleChange}
        //                     className="w-full border rounded p-2"
        //                 />
        //             </div>
        //             <div className="flex justify-end space-x-4">
        //                 <button 
        //                     type="button"
        //                     onClick={onClose}
        //                     className="px-4 py-2 bg-gray-200 rounded"
        //                 >
        //                     Cancel
        //                 </button>
        //                 <button 
        //                     type="submit"
        //                     disabled={loading}
        //                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        //                 >
        //                     {loading ? 'Saving...' : (courseData ? 'Update Course' : 'Create Course')}
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    );
};

CourseModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    courseData: PropTypes.object,
    onSubmit: PropTypes.func
};

export default CourseModal;