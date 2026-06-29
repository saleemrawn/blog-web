import api from "../../../adapters/api";

const basePath = "/posts";

const getComments = async (postId) => {
  const res = await api.get(`${basePath}/${postId}/comments`);
  return res.data;
};

const getCommentsCount = async (postId) => {
  const res = await api.get(`${basePath}/${postId}/comments/count`);
  return res.data;
};

const createComment = async ({ content, authorId, postId }) => {
  const res = await api.post(`${basePath}/${postId}/comments`, {
    content,
    authorId,
    postId,
  });
  return res.data;
};

const deleteComment = async ({ postId, commentId }) => {
  const res = await api.delete(`${basePath}/${postId}/comments/${commentId}`);

  return res.data;
};

export { getComments, getCommentsCount, createComment, deleteComment };
