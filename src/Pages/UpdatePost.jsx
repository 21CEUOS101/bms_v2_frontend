import React, { useState } from 'react'

function UpdatePost() {
    const categories = ['tech', 'sports', 'politics', 'entertainment', 'science', 'health', 'business'];

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
        }
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    return (
    
        <div className="bg-white shadow-lg rounded-lg pb-12 pt-8 mx-auto px-10 mb-8 container">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Create Post</h3>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="title"
                        type="text"
                        placeholder="Title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="description"
                        type="text"
                        placeholder="Description"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="content"
                        type="text"
                        placeholder="Content"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="image"
                        type="file"
                        placeholder="Image"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="category"
                        type="text"
                        placeholder="Category"
                    >
                        {categories.map((category, index) => {
                            return (
                                <option key={index} value={category}>{category}</option>
                            );
                        }
                        )}
                    </select>

                </div>
                {/* tags     */}
            
                <div className="relative mb-8">
                    <input
                        type="text"
                        value={tagInput}
                        placeholder="Add tags..."
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="top-full left-0 mt-1 mb-8">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-block bg-blue-300 hover:bg-red-500 text-white text-sm font-semibold py-1 px-2 rounded-full mr-2 mb-2 cursor-pointer"
                                onClick={() => removeTag(index)}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePost