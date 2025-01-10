"use client";
import { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import PatternPost from "./PatternPost";
import HelpPost from "./HelpPost";

export default function AllPosts() {
    return (
        <>
        <div className="flex flex-col w-screen justify-center items-center mt-[20px] gap-[20px]">
            <BlogPost></BlogPost>
            <HelpPost></HelpPost>
            <PatternPost></PatternPost>
        </div>
        </>
    )
}