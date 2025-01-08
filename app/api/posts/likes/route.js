import { supabase } from '../../../../utils/supabase/client';

const supabaseClient = supabase();

export async function POST(req) {
    try {
      const body = await req.json();
      const { post_id, user_id } = body;
  
      if (!post_id || !user_id) {
        return new Response(JSON.stringify({ error: "Post ID and User ID are required" }), { status: 400 });
      }

      const { data: post, error: postError } = await supabaseClient
        .schema('blog')
        .from('post')
        .select('id')
        .eq('id', post_id)
        .single();
  
      if (postError || !post) {
        return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
      }
  
      const { error: likeError } = await supabaseClient
        .schema('blog')
        .from('post_likes')
        .insert({ post_id, user_id });
  
      if (likeError) {
        console.error("Supabase error (likes):", likeError.message);
        return new Response(JSON.stringify({ error: likeError.message }), { status: 500 });
      }
  
      return new Response(JSON.stringify({ success: true, message: "Like added" }), { status: 201 });
    } catch (err) {
      console.error("Unexpected error:", err);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  }

  export async function DELETE(req) {
    try {
      const body = await req.json();
      const { post_id, user_id } = body;
  
      if (!post_id || !user_id) {
        return new Response(JSON.stringify({ error: "Post ID and User ID are required" }), { status: 400 });
      }
  
      const { error: likeError } = await supabaseClient
        .schema('blog')
        .from('post_likes')
        .delete()
        .eq('post_id', post_id)
        .eq('user_id', user_id);
  
      if (likeError) {
        console.error("Supabase error (likes):", likeError.message);
        return new Response(JSON.stringify({ error: likeError.message }), { status: 500 });
      }
  
      return new Response(JSON.stringify({ success: true, message: "Like removed" }), { status: 200 });
    } catch (err) {
      console.error("Unexpected error:", err);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  }
  