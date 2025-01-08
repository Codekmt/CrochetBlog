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

    const pictures = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

    const coverPicture = "01.jpg";

    return (
        <div className="w-[400px] sm:w-[500px]">
            <div className="flex items-center gap-[10px]">
                <div className="bg-gray-200 w-[50px] h-[50px] rounded-full flex items-center">
                    <span role="img" aria-label="Profile" className="text-2xl ml-[10px]">
                    👤
                    </span>
                </div>
                <p>Username123</p>
                <div className="bg-gray-200 pl-[10px] pr-[10px] ml-auto">{tag}</div>
            </div>
            <div className="ml-[60px]">
                <h1 className="text-2xl mb-[10px]">Pattern Title</h1>
                <p className="italic">short description in which I explain what kind of patterns this is and what you can use it for.</p>
            </div>
            <div className="ml-[60px] mt-[10px] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px]">
                <img src={coverPicture} className="w-full h-full object-cover"></img>
            </div>
            <div className="ml-[60px]">
                <p className="whitespace-pre-line">
                    {description}
                </p>
            </div>
            <div>
                {pictures.map((picture, index) => (
                    <div className="flex flex-col ml-[60px] mt-[10px] w-[350px] h-auto sm:w-[400px] sm:h-auto gap-[10px]" key={index}>
                        <img index={index} src={`/${picture}`} className="w-full h-full object-cover"></img>
                    </div>
                ))}
            </div>
            <SocialBar></SocialBar>
        </div>
    )
}