import ProfileDropdown from "@/components/ProfileDropdown";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="w-full bg-white shadow">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left section for navigation links from Eefje */}
              <div className="flex items-center">
                <a href="/" className="text-lg font-semibold">
                  Navigation links from Eefje
                </a>
              </div>

              {/* Right section for the profile dropdown */}
              <div className="flex items-center">
                <ProfileDropdown />
              </div>
            </div>
          </nav>
        </header>

      
        <main className="py-8">{children}</main>

     
        <footer className="text-center text-sm py-4">
          <p>© 2024 Hooked Crochet Blog</p>
        </footer>
      </body>
    </html>
  );
}
