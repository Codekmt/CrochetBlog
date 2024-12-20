import { supabase } from '../../../utils/supabase/client';

export async function GET() {
  const supabaseClient = supabase();
  
  const { data: posts, error } = await supabaseClient
    .from('post')
    .select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(posts), { status: 200 });
}

// export async function POST(req) {
//   const supabaseClient = supabase();
  
//   const { title, content, category_id } = await req.json();  

//   const { data: newPost, error } = await supabaseClient
//     .from('post')
//     .insert({ title, content, category_id })
//     .select()
//     .single();

//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }

//   return new Response(JSON.stringify(newPost), { status: 201 });
// }
