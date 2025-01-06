"use client";
import { useEffect, useState, useRef } from "react";
import SocialBar from "./socialBar";

export default function BlogPost() {
    const description = "Here a description for this post. It can be 3 lines at most in the preview. if you want to see more, you should press “view more” to read the entire post. In this blogpost, you can show off your favourite crochet works. Do not forget to tag the original patternmaker if there is one!"
    
    const initialView = "overflow-hidden leading-4 h-12 mt-[10px]"
    const viewMore = "leading-4 h-auto mt-[10px]"

    const initialText = "View more";
    const viewLess = "View less";
    const [viewText, setViewText] = useState(initialText);
    const [viewState, setViewState] = useState(initialView);
    const [isShort, setIsShort] = useState(false);

    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            //measure full height instead of restricted height by removing h-12 and replacing it with h-auto
            const element = contentRef.current;
            const originalClass = element.className;
            element.className = "leading-4 h-auto mt-[10px]";

            //measure height
            const divHeight = contentRef.current.offsetHeight;
            const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight);
            const lines = divHeight / lineHeight;
            setIsShort(lines <= 4);

            //set classname back to original (h-12)
            element.className = originalClass;
        }
    }, []);

    const clickevent = () => {
        //TODO make click event to show more text
        if(viewState === initialView) {
            setViewState(viewMore);
            setViewText(viewLess);
        } else {
            setViewState(initialView);
            setViewText(initialText);
        }
        console.log("view more/less");
    };

    return (
        <div className="w-[400px] sm:w-[500px]">
            <div className="flex items-center gap-[10px]">
                <div className="bg-gray-200 w-[50px] h-[50px] rounded-full"></div>
                <p>Username123</p>
            </div>
            <div className="ml-[60px]">
                <h1 className="text-2xl">Post Title</h1>
                <p ref={contentRef} className={viewState}>{description}</p>
                {!isShort && (
                    <button className="text-gray-500 mb-[10px]" onClick={clickevent}>{viewText}</button>
                    )}
            </div>
            <div className="grid ml-[60px] w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] grid-cols-2 gap-[5px]">
                <div className="bg-gray-200 w-full h-full"></div>
                <div className="bg-gray-200 w-full h-full"></div>
                <div className="bg-gray-200 w-full h-full"></div>
                <div className="bg-gray-200 w-full h-full"></div>
            </div>
            <SocialBar></SocialBar>
        </div>
    )
}