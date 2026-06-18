import * as postService from "../services/postService";
import { useEffect, useState } from "react";

const useGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosts = () => {
    setIsLoading(true);
    postService
      .getPosts()
      .then((posts) => setPosts(posts.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => getPosts, []);

  return { posts, isLoading, error };
};

const useGetPostById = (postId) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPostById = () => {
    setIsLoading(true);
    postService
      .getPostById(postId)
      .then((post) => setPost(post.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => getPostById, [postId]);

  return { post, isLoading, error };
};

export { useGetPosts, useGetPostById };
