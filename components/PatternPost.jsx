"use client";
import { useEffect, useState, useRef } from "react";
import SocialBar from "./socialBar";
import Link from "next/link";

export default function PatternPost() {
    const picture = "01.jpg";

    const initialView = "overflow-hidden leading-4 h-12 mt-[10px]";
    const viewMore = "leading-4 h-auto mt-[10px]";
    const initialText = "View more";
    const viewLess = "View less";
    const [viewText, setViewText] = useState(initialText);
    const [viewState, setViewState] = useState(initialView);
    const [isShort, setIsShort] = useState(false);

    const contentRef = useRef(null);

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

    useEffect(() => {
        if (contentRef.current) {
            const element = contentRef.current;
            const originalClass = element.className;
            element.className = "leading-4 h-auto mt-[10px]";
            const divHeight = contentRef.current.offsetHeight;
            const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight);
            const lines = divHeight / lineHeight;
            setIsShort(lines <= 4);
            element.className = originalClass;
        }
    }, []);

    const handleToggleView = () => {
        setViewState((prev) => (prev === initialView ? viewMore : initialView));
        setViewText((prev) => (prev === initialText ? viewLess : initialText));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col gap-[20px]">
            {posts.map((post) => (
                <div className="w-[400px] sm:w-[500px]" key={post.id}>
                    <div className="flex items-center gap-[10px]">
                        <div className="bg-gray-200 w-[50px] h-[50px] rounded-full flex items-center">
                            <span role="img" aria-label="Profile" className="text-2xl ml-[10px]">👤</span>
                        </div>
                        <p>{`${post.user.first_name}`} {`${post.user.last_name}`}</p>
                        <div className="bg-gray-200 pl-[10px] pr-[10px] ml-auto">
                            {post.tag.length > 0 ? post.tag[0].title : 'No tag'}
                        </div>
                    </div>
                    
                    <div className="ml-[60px]">
                        <h1 className="text-2xl">{post.title || "Untitled"}</h1>
                        <Link href="/Pattern" className="text-gray-500 mb-[10px]">View full pattern</Link>
                        <p ref={contentRef} className={viewState}>{post.content || "No content available"}</p>
                        {!isShort && (
                            <button className="text-gray-500 mb-[10px]" onClick={handleToggleView}>{viewText}</button>
                        )}
                    </div>

                    <div className="ml-[60px] mt-[10px] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px]">
                        <div className="w-full h-full">
                            <img src={`/${picture}`} className="w-full h-full object-cover" alt="Pattern Image" />
                        </div>
                    </div>
                    <SocialBar postId={post.id}></SocialBar>
                </div>
            ))}
        </div>
    );
}
