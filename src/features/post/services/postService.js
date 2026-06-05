import api from "../../../adapters/api";

const basePath = "/posts";

const getPosts = async () => {
  const res = await api.get(basePath);
  return res.data;
};

const getPostById = async (postId) => {
  const res = await api.get(`${basePath}/${postId}`);
  return res.data;
};

const createPost = async ({ title, content, authorId, categories }) => {
  const res = await api.post(basePath, {
    title,
    content,
    authorId,
    categories,
  });

  return res.data;
};

const updatePost = async ({ postId, title, content, categories }) => {
  const res = await api.put(`${basePath}/${postId}`, {
    title,
    content,
    categories,
  });

  return res.data;
};

const deletePost = async (postId) => {
  const res = await api.delete(`${basePath}/${postId}`);
  return res.data;
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
