"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import SocialBar from "./socialBar";

export default function PatternPost() {

    const tag = "tag";
    const picture = "01.jpg"

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch("/api/posts?category=3");
            const data = await response.json();
    
            if (response.ok) {
              setPosts(data);
            } else {
              setError(data.error || 'Failed to fetch posts');
            }
          } catch (err) {
            setError('Unexpected error occurred');
          } finally {
            setLoading(false);
          }
        };
    
        fetchPosts();
    }, []);

    console.log(posts);

    return (
        <div className="flex flex-col gap-[20px]">
            {posts.map((post, index) => (
                <div className="w-[400px] sm:w-[500px]" key={index}>
                    <div className="flex items-center gap-[10px]">
                        <div className="bg-gray-200 w-[50px] h-[50px] rounded-full flex items-center">
                            <span role="img" aria-label="Profile" className="text-2xl ml-[10px]">
                            👤
                            </span>
                        </div>
                        <p>Username123</p>
                        <div className="bg-gray-200 pl-[10px] pr-[10px] ml-auto">{tag}</div>
                    </div>
                    <div className="ml-[60px]">
                        <h1 className="text-2xl">{post.title}</h1>
                        <Link href="/Pattern" className="text-gray-500 mb-[10px]">View full pattern</Link>
                    </div>
                    <div className="ml-[60px] mt-[10px] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px]">
                        <div className="w-full h-full">
                            <img src={picture} className="w-full h-full object-cover"></img>
                        </div>
                    </div>
                    <SocialBar></SocialBar>
                </div>
            ))}
        </div>
    )
}