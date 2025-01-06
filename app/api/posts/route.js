import { supabase } from '../../../utils/supabase/client';

const supabaseClient = supabase();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const { data: post, error } = await supabaseClient
        .schema('blog')
        .from('post')
        .select(`
          *,
          category(*),
          post_comment(*),
          tag(*),
          post_images(*),
          post_likes(*)          
          `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

      return new Response(JSON.stringify(post), { status: 200 });
    } else {
      const { data: posts, error } = await supabaseClient
        .schema('blog')
        .from('post')
        .select(`
          *,
          category(*),
          post_comment(*),
          tag(*),
          post_images(*),
          post_likes(*)
        `);

      if (error) {
        console.error('Supabase error:', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

      return new Response(JSON.stringify(posts), { status: 200 });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { title, content, category, author_id, images, tags, likes, comments } = body;

    // Step 1: Insert the post into the "post" table
    const { data: newPost, error: postError } = await supabaseClient
      .schema('blog') 
      .from('post')
      .insert({ title, content, category, author_id })
      .select()
      .single();

    if (postError) {
      console.error("Supabase error (post):", postError.message);
      return new Response(JSON.stringify({ error: postError.message }), { status: 500 });
    }

    const postId = newPost.id; // Get the ID of the newly created post

    // Step 2: Insert related images into the "post_images" table
    if (images && images.length > 0) {
      const imageData = images.map((image_url) => ({
        post_id: postId,
        image_url,
      }));

      const { error: imagesError } = await supabaseClient
        .schema('blog')
        .from('post_images')
        .insert(imageData);

      if (imagesError) {
        console.error("Supabase error (images):", imagesError.message);
        return new Response(JSON.stringify({ error: imagesError.message }), { status: 500 });
      }
    }

    // Step 3: Link existing tags to the post in the "post_tag" table
    if (tags && tags.length > 0) {
      const tagData = tags.map((tagId) => ({
        post_id: postId,
        tag_id: tagId,
      }));

      const { error: tagsError } = await supabaseClient
        .schema('blog')
        .from('post_tag')
        .insert(tagData);

      if (tagsError) {
        console.error("Supabase error (tags):", tagsError.message);
        return new Response(JSON.stringify({ error: tagsError.message }), { status: 500 });
      }
    }

    // Step 4: Add likes to the "post_likes" table
    if (likes && likes.length > 0) {
      const likesData = likes.map((like) => ({
        post_id: postId,
        user_id: like.user_id, 
      }));

      const { error: likesError } = await supabaseClient
        .schema('blog')
        .from('post_likes')
        .insert(likesData);

      if (likesError) {
        console.error("Supabase error (likes):", likesError.message);
        return new Response(JSON.stringify({ error: likesError.message }), { status: 500 });
      }
    }

    // Step 5: Add comments to the "post_comment" table
    if (comments && comments.length > 0) {
      const commentsData = comments.map((comment) => ({
        post_id: postId,
        user_id: comment.user_id, 
        content: comment.content,
      }));

      const { error: commentsError } = await supabaseClient
        .schema('blog')
        .from('post_comment')
        .insert(commentsData);

      if (commentsError) {
        console.error("Supabase error (comments):", commentsError.message);
        return new Response(JSON.stringify({ error: commentsError.message }), { status: 500 });
      }
    }

    console.log("New post created with related data:", newPost);
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

// export async function PATCH(req) {
//   try {
//     const body = await req.json();
//     const { id, title, content, category_id } = body;

//     if (!id) {
//       return new Response(JSON.stringify({ error: "Post ID is required" }), { status: 400 });
//     }

//     const updates = {};
//     if (title) updates.title = title;
//     if (content) updates.content = content;
//     if (category_id) updates.category_i = category_id;

//     const { data, error } = await supabaseClient
//       .schema('blog')
//       .from('post')
//       .update(updates)
//       .eq('id', id);

//     if (error) {
//       console.error("Supabase error:", error.message);
//       return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }

//     console.log("Post updated:", data);
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
//   }
// }

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, title, content, category, images, tags, likes, comments } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Post ID is required" }), { status: 400 });
    }

    const updates = {};
    if (title) updates.title = title;
    if (content) updates.content = content;
    if (category) updates.category = category;

    // Update the post itself
    const { data: updatedPost, error: postError } = await supabaseClient
      .schema('blog')
      .from('post')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (postError) {
      console.error("Supabase error (post):", postError.message);
      return new Response(JSON.stringify({ error: postError.message }), { status: 500 });
    }

    // Update related images in the "post_images" table
    if (images) {
      // You can delete the old images if necessary before updating
      await supabaseClient
        .schema('blog')
        .from('post_images')
        .delete()
        .eq('post_id', id);

      const imageData = images.map((image_url) => ({
        post_id: id,
        image_url,
      }));

      const { error: imagesError } = await supabaseClient
        .schema('blog')
        .from('post_images')
        .insert(imageData);

      if (imagesError) {
        console.error("Supabase error (images):", imagesError.message);
        return new Response(JSON.stringify({ error: imagesError.message }), { status: 500 });
      }
    }

    // Update related tags in the "post_tag" table
    if (tags) {
      // You can delete the old tags if necessary before updating
      await supabaseClient
        .schema('blog')
        .from('post_tag')
        .delete()
        .eq('post_id', id);

      const tagData = tags.map((tagId) => ({
        post_id: id,
        tag_id: tagId,
      }));

      const { error: tagsError } = await supabaseClient
        .schema('blog')
        .from('post_tag')
        .insert(tagData);

      if (tagsError) {
        console.error("Supabase error (tags):", tagsError.message);
        return new Response(JSON.stringify({ error: tagsError.message }), { status: 500 });
      }
    }

    console.log("Post and related data updated:", updatedPost);
    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

