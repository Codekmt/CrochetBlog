//components/CreateHelpPost.tsx
"use client";
import { useState } from "react";

const CreateHelpPost = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    "Yarn",
    "Pattern",
    "Stiches",
    "Techniques",
    "Materials",
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-lg rounded p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Create a Help Post</h1>
        <form className="space-y-4">
      
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a title for your post"
              className="mt-1 block w-full rounded-md shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="short-description" className="block text-gray-700 font-medium">
              Short Description
            </label>
            <textarea
              id="short-description"
              rows={2}
              placeholder="Describe briefly what the issue is"
              className="mt-1 block w-full rounded-md shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="explanation" className="block text-gray-700 font-medium">
              Extended explanantion
            </label>
            <textarea
              id="explanation"
              rows={4}
              placeholder="Explain with details what you need help with."
              className="mt-1 block w-full rounded-md shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="help-needed-pictures" className="block text-gray-700 font-medium">
              Upload Instruction Pictures
            </label>
            <input
              id="help-needed-pictures"
              type="file"
              accept="image/*"
              multiple
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            <p className="text-sm text-gray-500 mt-1">
              Add pictures that can help understand your problem.
            </p>
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

        
          <button
            type="submit"
            className="bg-rose-500 text-white px-4 py-2 rounded shadow-md hover:bg-rose-700"
          >
            Publish Help Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHelpPost;
