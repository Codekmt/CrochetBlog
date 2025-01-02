"use client";
import { useEffect, useState, useRef } from "react";
import CommentSection from "./CommentSection";

export default function SocialBar() {
    //TODO: change initial likes to the amount of likes saved in the database
    const initialLikes = 0;

    const initialLikeState = false;
    const [likeAmount, setLikeAmount] = useState(initialLikes);
    const [likeState, setLikeState] = useState(initialLikeState);

    //TODO: post extra like to the database to update the likes count
    const likeClick = () => {
        if(!likeState) {
            setLikeAmount((prevAmount) => prevAmount + 1);
            setLikeState(true);
        } else {
            setLikeAmount((prevAmount) => prevAmount - 1);
            setLikeState(false);
        }
    }


    //TODO: comments amount should be the amount of comments saved in the database
    const commentsAmount = 0;


    const commentClick = () => {

    }


    return (
        <>
        <div className="w-[400px]">
            <div>
                <button onClick={likeClick} type="button">{likeAmount} Likes</button>
            </div>
            <div>
                <button onClick={commentClick} type="button">{commentsAmount} Comments</button>
            </div>
        </div>
        <CommentSection></CommentSection>
        </>
    )
}