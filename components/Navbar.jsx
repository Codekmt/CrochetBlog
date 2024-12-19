"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-200 p-4">
            <div className="flex justify-between items-center">
                <div className="text-black text-2xl">Logo</div>

                {/*desktop Navigation*/}
                <div className="hidden md:flex space-x-4">
                    <a href="/" className="text-black  text-lg hover:underline">
                        All Posts
                    </a>
                    <a href="/CreatePost" className="text-black  text-lg hover:underline">
                        Create Post
                    </a>
                    <a href="/Patterns" className="text-black  text-lg hover:underline">
                        Patterns
                    </a>
                    <a href="/Blog" className="text-black  text-lg hover:underline">
                        Blog
                    </a>
                    <a href="/Help" className="text-black  text-lg hover:underline">
                        Help
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white">
                <Menu className="h-5 w-5" />
                </button>
            </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="flex flex-col md:hidden bg-white p-4">
                        <a href="/" className="text-black  text-lg hover:underline">
                        All Posts
                        </a>
                        <a href="/CreatePost" className="text-black  text-lg hover:underline">
                        Create Post
                        </a>
                        <a href="/Patterns" className="text-black  text-lg hover:underline">
                        Patterns
                        </a>
                        <a href="/Blog" className="text-black  text-lg hover:underline">
                        Blog
                        </a>
                        <a href="/Help" className="text-black  text-lg hover:underline">
                        Help
                        </a>
                    </div>
                )}
        </nav>
    )
}

export default Navbar;