//app/(blog-pages)/CreatePost/page.tsx
import PostTypeSelector from "@/components/PostTypeSelector";

const CreatePostPage = () => {
  return (
    <section className="mt-16 flex justify-center">
        <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 w-full max-w-md h-48 flex flex-col justify-center">
          <PostTypeSelector />
        </div>
      </section>
  );
};

export default CreatePostPage;