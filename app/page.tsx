"use client"
import PostTypeSelector from "@/components/PostTypeSelector";
import { useEffect, useState } from "react";


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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mt-8 flex flex-col text-center">
        <h1 className="text-2xl font-bold">Welcome to Hooked Crochet Blog!</h1>
        <p className="mt-4 text-gray-600">
          Explore tutorials, patterns, and tips for crochet enthusiasts.
        </p>
      </section>
      
    </div>
  );
}
