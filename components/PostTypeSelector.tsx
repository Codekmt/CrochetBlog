"use client";  
import Link from 'next/link';

const PostTypeSelector = () => {
    return (
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-6">
          What kind of post do you want to create?
        </h1>
        <div className="flex justify-center space-x-4">
        <Link href="/CreateBlogPost" passHref>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Blog</button>
        </Link>
        <Link href="/CreateHelpPost" passHref>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Help</button>
        </Link>
        <Link href="/CreatePatternPost" passHref>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Pattern</button>
        </Link>
        </div>
      </div>
    );
  };
  
  export default PostTypeSelector;
  
  