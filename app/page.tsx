import PostTypeSelector from "@/components/PostTypeSelector";

export default function Index() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mt-8">
        <h1 className="text-2xl font-bold">Welcome to Hooked Crochet Blog!</h1>
        <p className="mt-4 text-gray-600">
          Explore tutorials, patterns, and tips for crochet enthusiasts.
        </p>
      </section>

      <section className="mt-16 flex justify-center">
        <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 w-full max-w-md h-48 flex flex-col justify-center">
          <PostTypeSelector />
        </div>
      </section>
    </div>
  );
}
