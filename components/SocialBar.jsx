"use client";
import { useState, useEffect } from "react";
import CommentSection from "./CommentSection";

export default function SocialBar({ postId, userId }) {
  const [Likes, setLikes] = useState(0);
  const [commentsAmount, setCommentsAmount] = useState(0); 
  const [loading, setLoading] = useState(true); 
  const [likeState, setLikeState] = useState(false); 
  const [error, setError] = useState(null); 
  const [commentSectionState, setCommentSectionState] = useState("hidden"); 

  useEffect(() => {
    async function fetchPostData() {
      try {
        const response = await fetch(`/api/posts?id=${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post data");
        const data = await response.json();

        setLikes(data.likes); 
        setCommentsAmount(data.commentsAmount);
        setLikeState(data.userLiked);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (postId) {
      fetchPostData(); 
    }
  }, [postId]); 

  const handleLikeClick = async () => {
    try {
      let response;
      const body = JSON.stringify({ post_id: postId, user_id: userId });

      if (likeState) {
        response = await fetch(`/api/posts/likes`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body,
        });
      } else {
        response = await fetch(`/api/posts/likes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
      }

      if (!response.ok) throw new Error("Failed to update likes");
      
      const data = await response.json();
      if (data.success) {
        setLikes((prevLikes) => (likeState ? prevLikes - 1 : prevLikes + 1)); 
        setLikeState(!likeState);
      }
    } catch (error) {
      console.error(error);
      setError(error.message); 
    }
  };

  const commentClick = () => {
    setCommentSectionState(prevState => (prevState === "hidden" ? "" : "hidden")); 
  };

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex w-[400px] ml-[60px] gap-[10px]">
        <div>
          <button onClick={handleLikeClick} type="button">
            {Likes} {likeState ? "Unlike" : "Like"} {/* Button toggles between Like/Unlike */}
          </button>
        </div>
        <div>
          <button onClick={commentClick} type="button">
            {commentsAmount} Comments
          </button>
        </div>
      </div>
      <div className={`${commentSectionState} ml-[50px] m-[20px]`}>
        <CommentSection />
      </div>
    </>
  );
}
