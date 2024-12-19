"use client";  

import { useState } from "react";
import Link from "next/link";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
        onClick={toggleDropdown}
      >
        <span role="img" aria-label="Profile" className="text-xl">
          👤
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
          <ul>
            <li>
              <Link href="/profile" className="block px-4 py-2 text-gray-800">
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="block px-4 py-2 text-gray-800">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/login" className="block px-4 py-2 text-gray-800">
                Login/Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
