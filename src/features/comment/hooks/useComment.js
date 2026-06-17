import * as commentService from "../services/commentService";
import { useEffect, useState } from "react";

const useGetComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setIsLoading(true);
    commentService
      .getComments(postId)
      .then((comments) => setComments(comments.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => fetchComments, [postId]);

  return { comments, isLoading, error, refetch: fetchComments };
};

const useGetCommentsCount = (postId) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCommentsCount = () => {
    setIsLoading(true);
    commentService
      .getCommentsCount(postId)
      .then((count) => setCount(count.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => fetchCommentsCount, []);

  return { count, isLoading, error };
};

const useCreateComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createComment = ({ content, authorId, postId }) => {
    setIsLoading(true);
    setError(null);

    return commentService
      .createComment({
        content,
        authorId,
        postId,
      })
      .catch((err) => {
        setError(err);
        throw err;
      })
      .finally(() => setIsLoading(false));
  };

  const resetError = () => setError(null);

  return { createComment, isLoading, error, resetError };
};

export { useGetComments, useGetCommentsCount, useCreateComment };
