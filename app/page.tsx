"use client"
import PostTypeSelector from "@/components/PostTypeSelector";
import { useEffect, useState } from "react";
import AllPosts from "@/components/AllPosts";


export default function Index() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await fetch('/api/posts', {
          method: 'GET',
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();
        setPosts(data);
        console.log('Fetched posts:', data);
      } catch (err: any) {
        console.error('Failed to fetch posts', err);
        const errorMessage = err?.message || 'An unknown error occurred';
        setError(errorMessage);
      }
    }
    fetchAllPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col w-screen justify-center mt-[20px]">
        <AllPosts></AllPosts>
      </div>
    </>
  );
}
