"use client";
import Link from "next/link";

export default function PatternPost() {

    const tag = "tag";

    return (
        <div className="w-[500px]">
            <div className="flex items-center gap-[10px]">
                <div className="bg-gray-200 w-[50px] h-[50px] rounded-full"></div>
                <p>Username123</p>
                <div className="bg-gray-200 pl-[10px] pr-[10px] ml-auto">{tag}</div>
            </div>
            <div className="ml-[60px]">
                <h1 className="text-2xl">Pattern Title</h1>
                <Link href="/pattern" className="text-gray-500 mb-[10px]">View full pattern</Link>
            </div>
            <div className="ml-[60px] mt-[10px] w-[400px] h-[400px]">
                <div className="bg-gray-200 w-full h-full"></div>
            </div>
        </div>
    )
}