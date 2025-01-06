"use client";
import Link from "next/link";
import SocialBar from "./socialBar";

export default function PatternDetail() {

    const tag = "tag";

    const description = `longer description/tutorial for the pattern.

    Step 1: instructions for step 1.
    Step 2: instructions for step 2.
    Step 3: instructions for step 3.
    Step 4: instructions for step 4.

    Enjoy the pattern!`

    return (
        <div className="w-[400px] sm:w-[500px]">
            <div className="flex items-center gap-[10px]">
                <div className="bg-gray-200 w-[50px] h-[50px] rounded-full"></div>
                <p>Username123</p>
                <div className="bg-gray-200 pl-[10px] pr-[10px] ml-auto">{tag}</div>
            </div>
            <div className="ml-[60px]">
                <h1 className="text-2xl mb-[10px]">Pattern Title</h1>
                <p className="italic">short description in which I explain what kind of patterns this is and what you can use it for.</p>
            </div>
            <div className="ml-[60px] mt-[10px] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px]">
                <div className="bg-gray-200 w-full h-full"></div>
            </div>
            <div className="ml-[60px]">
                <p className="whitespace-pre-line">
                    {description}
                </p>
            </div>
            <div className="flex flex-col ml-[60px] mt-[10px] w-[350px] h-auto sm:w-[400px] sm:h-auto gap-[10px]">
                <div className="bg-gray-200 w-full h-[400px]"></div>
                <div className="bg-gray-200 w-full h-[400px]"></div>
                <div className="bg-gray-200 w-full h-[400px]"></div>
                <div className="bg-gray-200 w-full h-[400px]"></div>
            </div>
            <SocialBar></SocialBar>
        </div>
    )
}