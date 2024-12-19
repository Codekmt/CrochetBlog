const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            <div className="max-w-7xl mx-auto">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Hooked. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
