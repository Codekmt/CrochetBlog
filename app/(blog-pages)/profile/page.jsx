import PatternPost from "@/components/PatternPost";
import ProfileStats from "@/components/ProfileStats"

export default function Profile() {
    return (
        <>
        <div className="mt-[20px]">
            <div className="flex flex-col lg:grid lg:grid-cols-3">
                <div className="lg:col-start-1 lg:col-end-2 lg:row-start-1 flex lg:items-start justify-center">
                <ProfileStats />
                </div>
                <div className="lg:col-start-2 lg:col-end-3 lg:row-start-1 flex lg:items-start flex items-center justify-center">
                <PatternPost />
                </div>
            </div>
        </div>
        </>
    );
  }