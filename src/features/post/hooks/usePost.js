import * as postService from "../services/postService";
import { useEffect, useState } from "react";

const useGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const posts = await postService.getPosts();
      setPosts(posts.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return { posts, isLoading, error };
};

const useGetPostById = (postId) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPostById = async () => {
    setIsLoading(true);

    try {
      const post = await postService.getPostById(postId);
      setPost(post.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostById();
  }, [postId]);

  return { post, isLoading, error };
};

export { useGetPosts, useGetPostById };
