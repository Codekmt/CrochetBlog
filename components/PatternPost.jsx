"use client";

import { useState } from "react";

const PatternPost = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    "Amigurumi",
    "Bags",
    "Clothes",
    "Home Deco",
    "Accessories",
    "Miscellaneous",
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Create a Pattern Post</h1>
      <form className="bg-white shadow-md rounded-lg p-6 space-y-4">

        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title for your pattern"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium">
            Description
          </label>
          <textarea
            id="description"
            rows="2"
            placeholder="Describe your pattern"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="instructions" className="block text-gray-700 font-medium">
            Instructions
          </label>
          <textarea
            id="instructions"
            rows="4"
            placeholder="Write some instructions"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-gray-700 font-medium">
            Upload a picture
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-4 py-2 rounded shadow-sm text-sm ${
                  selectedTags.includes(tag)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Publish Pattern
        </button>
      </form>
    </div>
  );
};

export default PatternPost;
