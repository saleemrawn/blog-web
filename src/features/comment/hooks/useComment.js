import * as commentService from "../services/commentService";
import { useEffect, useState } from "react";
import { getErrorDetails } from "../../../httpErrors";
import toast from "react-hot-toast";

const useGetComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setIsLoading(true);

    try {
      const comments = await commentService.getComments(postId);
      setComments(comments.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { comments, isLoading, error, refetch: fetchComments };
};

const useGetCommentsCount = (postId) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCommentsCount = async () => {
    setIsLoading(true);

    try {
      const count = await commentService.getCommentsCount(postId);
      setCount(count.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentsCount();
  }, []);

  return { count, isLoading, error, refetch: fetchCommentsCount };
};

const useCreateComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createComment = async ({ content, authorId, postId }) => {
    setIsLoading(true);
    setError(null);

    try {
      await commentService.createComment({ content, authorId, postId });
      toast.success("Comment posted");
    } catch (err) {
      setError(err);
      const error = getErrorDetails(err);
      toast.error(`${error.message} (${error.code})`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { createComment, isLoading, error, resetError };
};

const useDeleteComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteComment = async ({ postId, commentId }) => {
    setIsLoading(true);
    setError(null);

    try {
      await commentService.deleteComment({ postId, commentId });
      toast.success("Comment deleted");
    } catch (err) {
      setError(err.response);
      const error = getErrorDetails(err);
      toast.error(`${error.message} (${error.code})`);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteComment, isLoading, error };
};

export {
  useGetComments,
  useGetCommentsCount,
  useCreateComment,
  useDeleteComment,
};
