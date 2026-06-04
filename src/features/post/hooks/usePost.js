import * as postService from "../services/post-service.js";
import { useEffect, useState } from "react";

const useGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    postService
      .getPosts()
      .then((posts) => setPosts(posts.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { posts, isLoading, error };
};

const useGetPostById = (postId) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;
    setIsLoading(true);
    postService
      .getPostById(postId)
      .then((post) => setPost(post))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [postId]);

  return { post, isLoading, error };
};

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async ({ title, content, authorId, categories }) => {
    setIsLoading(true);
    try {
      const post = await postService.createPost({
        title,
        content,
        authorId,
        categories,
      });

      return post;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, isLoading, error };
};

const useUpdatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePost = async ({
    postId,
    title,
    content,
    authorId,
    categories,
  }) => {
    setIsLoading(true);
    try {
      const post = await postService.updatePost({
        postId,
        title,
        content,
        authorId,
        categories,
      });

      return post;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { updatePost, isLoading, error };
};

const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePost = async (postId) => {
    setIsLoading(true);
    try {
      const post = await postService.deletePost(postId);
      return post;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deletePost, isLoading, error };
};

export {
  useGetPosts,
  useGetPostById,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
};
