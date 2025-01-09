"use client";
import { useEffect, useState, useRef } from "react";
import SocialBar from "./socialBar";

export default function BlogPost({ category }) {
    const description = "Here a description for this post. It can be 3 lines at most in the preview. if you want to see more, you should press “view more” to read the entire post. In this blogpost, you can show off your favourite crochet works. Do not forget to tag the original patternmaker if there is one!"
    
    const initialView = "overflow-hidden leading-4 h-12 mt-[10px]"
    const viewMore = "leading-4 h-auto mt-[10px]"

    const initialText = "View more";
    const viewLess = "View less";
    const [viewText, setViewText] = useState(initialText);
    const [viewState, setViewState] = useState(initialView);
    const [isShort, setIsShort] = useState(false);

    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            //measure full height instead of restricted height by removing h-12 and replacing it with h-auto
            const element = contentRef.current;
            const originalClass = element.className;
            element.className = "leading-4 h-auto mt-[10px]";

            //measure height
            const divHeight = contentRef.current.offsetHeight;
            const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight);
            const lines = divHeight / lineHeight;
            setIsShort(lines <= 4);

            //set classname back to original (h-12)
            element.className = originalClass;
        }
    }, []);

    const clickevent = () => {
        //TODO make click event to show more text
        if(viewState === initialView) {
            setViewState(viewMore);
            setViewText(viewLess);
        } else {
            setViewState(initialView);
            setViewText(initialText);
        }
        console.log("view more/less");
    };

    const pictures = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];
    //const pictures = ["01.jpg", "02.jpg"];
    //const pictures = ["01.jpg"];
    const initialPictureState = "grid ml-[60px] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] grid-cols-2 gap-[5px]";
    const [pictureState, setPictureState] = useState(initialPictureState);

    useEffect(() => {
        if(pictures.length === 1){
            setPictureState("ml-[60px] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] flex items-center justify-center");
        }else if(pictures.length < 3){
            setPictureState("grid ml-[60px] w-[350px] h-[175px] sm:w-[400px] sm:h-[200px] grid-cols-2 gap-[5px]");
        }
      }, []);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch("/api/posts?category=2");
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
    }, [category]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                    </div>
                    <div className="ml-[60px]">
                        <h1 className="text-2xl">{post.title || "untitled"}</h1>
                        <p ref={contentRef} className={viewState}>{post.content || "no content available"}</p>
                        {!isShort && (
                            <button className="text-gray-500 mb-[10px]" onClick={clickevent}>{viewText}</button>
                        )}
                    </div>
                    <div className={pictureState}>
                        {pictures.map((picture, picIndex) => (
                            <div
                                className={`relative ${pictures.length === 1 ? "w-full h-full" : "w-full h-0 pb-[100%]"}`}
                                key={picIndex}
                            >
                                <img
                                    src={`/${picture}`}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <SocialBar postId={post.id}></SocialBar>
                </div>
            ))}
        </div>
    );
}