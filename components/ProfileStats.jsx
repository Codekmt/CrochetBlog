"use client";

export default function ProfileStats() {
    return (
        <div className="w-[400px]">
            <div className="flex flex-col items-center gap-[10px]">
                <div className="bg-gray-200 w-[150px] h-[150px] rounded-full"></div>
                <p className="text-xl font-bold">Username123</p>
                <p className="text-gray-500">x posts</p>
            </div>
        </div>
    )
}