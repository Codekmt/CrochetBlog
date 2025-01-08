import { supabase } from '../../../../utils/supabase/client';

const supabaseClient = supabase();

export async function POST(req) {
    try {
      const body = await req.json();
      const { post_id, user_id, content } = body;
  
      if (!post_id || !user_id || !content) {
        return new Response(JSON.stringify({ error: "Post ID, User ID, and content are required" }), { status: 400 });
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
  
      const { error: commentError } = await supabaseClient
        .schema('blog')
        .from('post_comment')
        .insert({ post_id, user_id, content });
  
      if (commentError) {
        console.error("Supabase error (comments):", commentError.message);
        return new Response(JSON.stringify({ error: commentError.message }), { status: 500 });
      }
  
      return new Response(JSON.stringify({ success: true, message: "Comment added" }), { status: 201 });
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
        return new Response(
          JSON.stringify({ error: "Post ID and User ID are required" }),
          { status: 400 }
        );
      }

      const { error: commentError } = await supabaseClient
        .schema('blog')
        .from('post_comment') 
        .delete()
        .eq('post_id', post_id)
        .eq('user_id', user_id);
  
      if (commentError) {
        console.error("Supabase error (comments):", commentError.message);
        return new Response(JSON.stringify({ error: commentError.message }), {
          status: 500,
        });
      }
  
      return new Response(
        JSON.stringify({ success: true, message: "Comment deleted" }),
        { status: 200 }
      );
    } catch (err) {
      console.error("Unexpected error:", err);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }
  

  export async function PATCH(req) {
    try {
      const body = await req.json();
      const { post_id, user_id, content } = body;
  
  
      if (!post_id || !user_id || !content) {
        return new Response(
          JSON.stringify({ error: "Post ID, User ID, and new content are required" }),
          { status: 400 }
        );
      }
  
      const { error: updateError } = await supabaseClient
        .schema('blog')
        .from('post_comment') 
        .update({ content }) 
        .eq('post_id', post_id)
        .eq('user_id', user_id);
  
      if (updateError) {
        console.error("Supabase error (update comment):", updateError.message);
        return new Response(JSON.stringify({ error: updateError.message }), {
          status: 500,
        });
      }
  
      return new Response(
        JSON.stringify({ success: true, message: "Comment updated" }),
        { status: 200 }
      );
    } catch (err) {
      console.error("Unexpected error:", err);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }
  