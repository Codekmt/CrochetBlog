import { supabase } from '../../../utils/supabase/client';

const supabaseClient = supabase();

export async function GET() {

  const { data: posts, error } = await supabaseClient
    .schema('blog')
    .from('post')
    .select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(posts), { status: 200 });
}

export async function POST(req) {

  try {
    const body = await req.json();

    const { title, content, category_id, author_id } = body;

    const { data: newPost, error } = await supabaseClient
      .schema('blog')
      .from('post')
      .insert({ title, content, category_id, author_id })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    console.log("New post created:", newPost);
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Post ID is required" }), { status: 400 });
    }

    const { data, error } = await supabaseClient
      .schema('blog')
      .from('post')
      .delete()
      .match({ id });

    if (error) {
      console.error("Supabase error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    console.log("Post deleted:", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, title, content, category_id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Post ID is required" }), { status: 400 });
    }

    const updates = {};
    if (title) updates.title = title;
    if (content) updates.content = content;
    if (category_id) updates.category_i = category_id;

    const { data, error } = await supabaseClient
      .schema('blog')
      .from('post')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error("Supabase error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    console.log("Post updated:", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
