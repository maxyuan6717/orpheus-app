import axios from "axios";
import { Base } from "./base";

const addUser = async (email) => {
  let user = await axios.post(`${Base}/user/add`, { email: email });
  return user;
};

const getUser = async (id) => {
  let user = await axios.post(`${Base}/user/get`, { userId: id });
  return user;
};

const checkUser = async () => {
  let auth = await axios.get(`${Base}/user/check`);
  return auth;
};

const saveUser = async (id, responses) => {
  let saved = await axios.post(`${Base}/user/save`, {
    userId: id,
    responses: responses,
  });
  return saved;
};

const registerUser = async (id, name, password1, password2) => {
  let user = await axios.post(`${Base}/user/register`, {
    userId: id,
    name,
    password1,
    password2,
  });
  return user;
};

const loginUser = async (email, password) => {
  let user = await axios.post(`${Base}/user/login`, { email, password });
  return user;
};

export { addUser, getUser, checkUser, saveUser, registerUser, loginUser };
