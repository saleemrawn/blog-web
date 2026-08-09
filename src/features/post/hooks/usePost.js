import * as postService from "../services/postService";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getErrorDetails } from "../../../httpErrors";

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
      const errDetails = getErrorDetails(err);
      setError(errDetails);
      toast.error(
        `${errDetails?.message} ${errDetails?.code ? `(${errDetails?.code})` : ""}`,
      );
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
      const errDetails = getErrorDetails(err);
      setError(errDetails);
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
