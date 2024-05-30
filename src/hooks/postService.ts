// src/hooks/postService.ts
import axios from "axios";
import { Post } from "../types";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get("http://localhost:3000/posts");
  return response.data;
};

export const fetchPost = async (postId: number): Promise<Post> => {
  const response = await axios.get(`http://localhost:3000/posts/${postId}`);
  return response.data;
};

export const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  const response = await axios.post("http://localhost:3000/posts", newPost);
  return response.data;
};

export const updatePost = async (updatedPost: Post): Promise<Post> => {
  const response = await axios.put(
    `http://localhost:3000/posts/${updatedPost.id}`,
    updatedPost
  );
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`http://localhost:3000/posts/${postId}`);
};
