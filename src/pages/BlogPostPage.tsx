import { useQuery } from "@tanstack/react-query";
import { Post } from "../types";
import { useParams } from "react-router-dom";
import { fetchPost } from "../hooks/postService";

function BlogPostPage() {
  const { id } = useParams<{ id?: string }>();

  const postIdNumber = id ? parseInt(id) : undefined;

  const {
    data: post,
    isLoading: isLoadingPost,
    error: postError,
  } = useQuery<Post>({
    queryKey: ["post", postIdNumber],
    queryFn: () => fetchPost(postIdNumber!),
    enabled: !!postIdNumber,
  });

  if (!postIdNumber) {
    return <div>Error: Post ID is missing.</div>;
  }

  if (isLoadingPost) {
    return <div>Loading...</div>;
  }

  if (postError) {
    return <div>An error occurred: {postError.message}</div>;
  }

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.views} views</p>
    </div>
  );
}

export { BlogPostPage };
