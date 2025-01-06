//components/CreatePatternPost.tsx
"use client";
import { useState } from "react";

const CreatePatternPost = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    "Amigurumi",
    "Bags",
    "Clothes",
    "Home Deco",
    "Accessories",
    "Miscellaneous",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    coverPicture: null,
    instructionPictures: null,
    tag: [],
  })

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      const updatedTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      setFormData((formData) => ({
        ...formData,
        tag: updatedTags,
      }));
      return updatedTags;
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (!name) return;

    if (name === "coverPicture" || name === "instructionPictures") {
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
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-lg rounded p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Create a Pattern Post</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
      
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a title for your pattern"
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
              placeholder="Describe your pattern"
              className="mt-1 block w-full rounded-md shadow-sm"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="instructions" className="block text-gray-700 font-medium">
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows={4}
              placeholder="Write some instructions"
              className="mt-1 block w-full rounded-md shadow-sm"
              value={formData.instructions}
              onChange={handleChange}
            />
          </div>

          <div>
              <label htmlFor="cover-picture" className="block text-gray-700 font-medium">
                Upload Cover Picture
              </label>
              <input
                id="cover-picture"
                name="coverPicture"
                type="file"
                accept="image/*"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be the main image representing your pattern.
              </p>
            </div>

          <div>
            <label htmlFor="instruction-pictures" className="block text-gray-700 font-medium">
              Upload Instruction Pictures
            </label>
            <input
              id="instruction-pictures"
              name="instructionPictures"
              type="file"
              accept="image/*"
              multiple
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500 mt-1">
              Add pictures that illustrate the steps of your pattern.
            </p>
          </div>


          <div>
            <h2 className="text-lg font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  name="tag"
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
            Publish Pattern
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePatternPost;
