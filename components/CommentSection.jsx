"use client";

import { useState } from "react";

export default function CommentSection() {
    const testComment = "this looks great!";

    const [inputValue, setInputValue] = useState("");

    //TODO: Add submitted comment to database
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted Comment:", inputValue);
        setInputValue("");
    }

    //TODO: replace profile picture and username
    //add comments from database to post
    return (
        <>
        <div className="flex items-center gap-[10px]">
            <div className="bg-gray-200 w-[50px] h-[50px] rounded-full"></div>
            <p>Username123</p>
        </div>
        <div>
            <p className="ml-[60px]">{testComment}</p>
        </div>
        <div className="mt-[20px] mb-[20px]">
            <form onSubmit={handleSubmit} className="flex gap-[10px]">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" className="bg-gray-200 w-screen"></input>
                <input type="submit" className="p-[5px] bg-yellow-200"></input>
            </form>
        </div>
        </>
    )
}