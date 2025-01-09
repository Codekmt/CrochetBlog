import { supabase } from '../../../utils/supabase/client';

const supabaseClient = supabase();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');

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
        console.error('Error fetching post by ID:', id, error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

      return new Response(JSON.stringify(post), { status: 200 });
    } else {
      let query = supabaseClient.schema('blog').from('post').select(`
        *,
        category(*),
        post_comment(*),
        tag(*),
        post_images(*),
        post_likes(*)
      `);

      if (category) {
        const { data: filteredPostCategories, error: filterError } = await supabaseClient
          .schema('blog')
          .from('post_category')
          .select('post_id')
          .eq('category_id', category);

        if (filterError) {
          console.error("Error filtering posts by category:", filterError.message);
          return new Response(JSON.stringify({ error: filterError.message }), { status: 500 });
        }

        const postIds = filteredPostCategories.map((entry) => entry.post_id);

        if (postIds.length > 0) {
          query = query.in('id', postIds);
        } else {
          return new Response(JSON.stringify([]), { status: 200 });
        }
      }

      const { data: posts, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error.message);
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

    const postId = newPost.id;

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
    const { id, title, content, category, images, tags, likes, comments } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Post ID is required" }), { status: 400 });
    }

    const updates = {};
    if (title) updates.title = title;
    if (content) updates.content = content;
    if (category) updates.category = category;

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

    if (images) {
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
    if (tags) {
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

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

