import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let metadata = user?.user_metadata;
  console.log(metadata.username);

  if (!user) {
    return redirect('/sign-in');
  }

  const { data: userExample, error } = await supabase.from('profiles').select();

  if (error) {
    console.error('Error fetching notes:', error);
    return <div>Error loading notes.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Notes</h1>
      {userExample && userExample.length > 0 ? (
        <ul className="space-y-4">
          {userExample.map((userEx) => (
            <li
              key={userEx.id}
              className="p-4 border rounded shadow-sm bg-gray-100 dark:bg-gray-800"
            >
              <h2 className="font-semibold text-lg">{userEx.username || 'Untitled Note'}</h2>
              <p className="text-gray-700 dark:text-gray-300">{userEx.full_name || 'No content available.'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found. Add some notes to get started!</p>
      )}
      <Link
        href="/protected"
        className="mt-6 inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Go to Protected
      </Link>
    </div>
  );
}