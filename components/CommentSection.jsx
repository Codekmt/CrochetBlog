"use client";

export default function CommentSection() {
    const testComment = "this looks great!";
    return (
        <>
        <div>
            <div className="bg-gray-200 w-[50px] h-[50px] rounded-full"></div>
            <p>Username123</p>
        </div>
        <div>
            <p>{testComment}</p>
        </div>
        </>
    )
}