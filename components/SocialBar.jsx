"use client";
import { useState, useEffect } from "react";
import CommentSection from "./CommentSection";

export default function SocialBar({ postId }) {
    //fetch likes
    const [Likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true);
    const [likeState, setLikeState] = useState(false);
    
    useEffect(() => {
        async function fetchLikes() {
            try {
                const response = await fetch(`/api/posts/likes`);
                if(!response.ok) throw new Error('failed to fetch likes');
                const data = await response.json();
                setLikes(data.likes);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (postId){
            fetchLikes();
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleLikeClick = async (postId, currentLikeState) => {
        try {
            const response = await fetch(`/api/posts/likes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, like: !currentLikeState  }),
            });
            if (!response.ok) throw new Error("Failed to update likes");
            const data = await response.json();

            // Update the specific post's likes in the state
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, likes: data.likes } : post
                )
            );
        } catch (error) {
            console.error(error);
        }
    };


    //TODO: comments amount should be the amount of comments saved in the database
    const commentsAmount = 0;

    const [commentSectionState, setcommentSectionState] = useState("hidden");

    const commentClick = () => {
        if(commentSectionState == "hidden") {
            setcommentSectionState("");
        } else {
            setcommentSectionState("hidden");
        }
    }


    return (
        <>
        <div className="flex w-[400px] ml-[60px] gap-[10px]">
            <div>
                <button onClick={handleLikeClick} type="button">{Likes} Likes</button>
            </div>
            <div>
                <button onClick={commentClick} type="button">{commentsAmount} Comments</button>
            </div>
        </div>
        <div className={`${commentSectionState} ml-[50px] m-[20px]`}>
            <CommentSection></CommentSection>
        </div>
        </>
    )
}