"use client";
import { useEffect, useState, useRef } from "react";
import SocialBar from "./socialBar";

export default function BlogPost({ category }) {
    const initialView = "overflow-hidden leading-4 h-12 mt-[10px]";
    const viewMore = "leading-4 h-auto mt-[10px]";

    const initialText = "View more";
    const viewLess = "View less";
    const [viewText, setViewText] = useState(initialText);
    const [viewState, setViewState] = useState(initialView);
    const [isShort, setIsShort] = useState(false);

    const contentRef = useRef(null);

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

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/posts?category=2`);
                const data = await response.json();

                if (response.ok) {
                    setPosts(data);
                } else {
                    setError(data.error || "Failed to fetch posts");
                }
            } catch (err) {
                setError("Unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col gap-[20px]">
            {posts.map((post) => (
                <div className="w-[400px] sm:w-[500px]" key={post.id}>
                    {/* User Info */}
                    <div className="flex items-center gap-[10px]">
                        <div className="bg-gray-200 w-[50px] h-[50px] rounded-full flex items-center">
                            <span role="img" aria-label="Profile" className="text-2xl ml-[10px]">
                                👤
                            </span>
                        </div>
                        <p>{`${post.user.first_name}`} {`${post.user.last_name}`}</p>
                    </div>
                    
                    
                    {/* Post Content */}
                    <div className="ml-[60px]">
                        <h1 className="text-2xl">{post.title || "Untitled"}</h1>
                        <p ref={contentRef} className={viewState}>{post.content || "No content available"}</p>
                        {!isShort && (
                            <button className="text-gray-500 mb-[10px]" onClick={handleToggleView}>{viewText}</button>
                        )}
                    </div>

                    {/* Post Images */}
                    <div className="grid ml-[60px] gap-[5px]" style={{ gridTemplateColumns: `repeat(${Math.min(post.post_images.length, 2)}, 1fr)` }}>
                        {post.post_images.map((image) => (
                            <div className="relative w-full h-0 pb-[100%]" key={image.id}>
                                <img
                                    src={image.image_url}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    alt={`Post Image ${image.id}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Social Bar */}
                    <SocialBar postId={post.id} />
                </div>
            ))}
        </div>
    );
}
