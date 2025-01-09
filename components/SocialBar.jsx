"use client";
import { useState, useEffect } from "react";
import CommentSection from "./CommentSection";

export default function SocialBar({ postId }) {
    //fetch likes
    const [Likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likeState, setLikeState] = useState(false);
    
    useEffect(() => {
        async function fetchLikes() {
            try {
                const response = await fetch(`/api/posts/${postId}/likes`);
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
    }, [postId]);

    const handleLikeClick = async () => {
        try {
            const newLikeState = !likeState;
            const newLikes = newLikeState ? Likes + 1 : Likes - 1;
            setLikes(newLikes);
            setLikeState(newLikeState);

            const response = await fetch(`/api/posts/${postId}/likes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ likes: newLikes  }),
            });
            if (!response.ok) throw new Error("Failed to update likes");
            const data = await response.json();

            // Update the specific post's likes in the state

            setLikeState(!likeState);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(`/api/posts/${postId}/comments`);
                if(!response.ok) throw new Error('failed to fetch comments');
                const data = await response.json();
                setComments(data.comments);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (postId){
            fetchComments();
        }
    }, [postId]);

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