import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav>
            <div>
                <div>Logo</div>
                <div className="hidden md:flex space-x-4">
                    {" "}
                    <Link href="/" className="text-white  text-lg hover:underline">
                    All Posts
                    </Link>
                    <Link href="/CreatePost" className="text-white  text-lg hover:underline">
                    Create Post
                    </Link>
                    <Link href="/Patterns" className="text-white  text-lg hover:underline">
                    Patterns
                    </Link>
                    <Link href="/Blog" className="text-white  text-lg hover:underline">
                    Blog
                    </Link>
                    <Link href="/Help" className="text-white  text-lg hover:underline">
                    Help
                    </Link>
                </div>
            </div>
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white">
                <Menu className="h-5 w-5" />
            </button>
        </nav>
    )
}

export default Navbar;