"use client";

import { useState, useEffect } from "react";

export default function CommentSection({ comments }) {
    const [inputValue, setInputValue] = useState("");

    // TODO: Add submitted comment to database
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted Comment:", inputValue);
        setInputValue("");
    };

    return (
        <>
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id}>
                        <div className="flex items-center gap-[10px]">
                            <div className="bg-gray-200 w-[50px] h-[50px] rounded-full"></div>
                            <p>{comment.user.first_name} {comment.user.last_name}</p>
                        </div>
                        <div>
                            <p className="ml-[60px]">{comment.content}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}

            <div className="mt-[20px] mb-[20px]">
                <form onSubmit={handleSubmit} className="flex gap-[10px]">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        className="bg-gray-200 w-screen"
                    />
                    <input type="submit" className="p-[5px] bg-yellow-200" />
                </form>
            </div>
        </>
    );
}
