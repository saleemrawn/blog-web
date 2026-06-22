import api from "../../../adapters/api.js";

const basepath = "/users";

const createUser = async ({ firstName, lastName, username, password }) => {
  const res = await api.post(basepath, {
    firstName,
    lastName,
    username,
    password,
  });

  return res.data;
};

export { createUser };
