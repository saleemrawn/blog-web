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

export { useGetPosts, useGetPostById };
