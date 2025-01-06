//components/CreateBlogPost.tsx
"use client";
import { useState } from "react";

const CreateBlogPost = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pictures: [],
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (!name) return;

    if (name === "pictures") {
      setFormData((prev) => ({
        ...prev,
        [name]: files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.title || !formData.description) {
      alert("Title and description are required!");
      return;
    }
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-lg rounded p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Create a Blog Entry</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
      
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a title for your post"
              className="mt-1 block w-full rounded-md shadow-sm"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              placeholder="Enter a short description"
              className="mt-1 block w-full rounded-md shadow-sm"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="blog-entry-pictures" className="block text-gray-700 font-medium">
              Upload pictures
            </label>
            <input
              id="blog-entry-pictures"
              name="pictures"
              type="file"
              accept="image/*"
              multiple
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500 mt-1">
              Add pictures for your post.
            </p>
          </div>
        
          <button
            type="submit"
            className="bg-rose-500 text-white px-4 py-2 rounded shadow-md hover:bg-rose-700"
          >
            Publish Blog Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;
