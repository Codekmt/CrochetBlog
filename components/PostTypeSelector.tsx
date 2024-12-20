"use client";  

const PostTypeSelector = () => {
    return (
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-6">
          What kind of post do you want to create?
        </h1>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Blog</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Help</button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded">Pattern</button>
        </div>
      </div>
    );
  };
  
  export default PostTypeSelector;
  
  