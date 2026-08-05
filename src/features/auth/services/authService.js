import api from "../../../adapters/api.js";

const basePath = "/auth";

const login = async ({ username, password }) => {
  const res = await api.post(`${basePath}/login/web`, {
    username,
    password,
  });

  return res;
};

const logout = async () => {
  const res = await api.post(`${basePath}/logout`);
  return res.data;
};

const status = async () => {
  const res = await api.get(`${basePath}/status`);
  return res;
};

export { login, logout, status };
