import axios from "axios";
import { Base } from "./base";

const getUser = async () => {
  let user = await axios.post(`${Base}/user/get`);
  return user;
};

const checkUser = async () => {
  let auth = await axios.get(`${Base}/user/check`);
  return auth;
};

const saveUser = async (responses, day_no) => {
  let saved = await axios.post(`${Base}/user/save`, {
    responses,
    day_no,
  });
  return saved;
};

const registerUser = async (email, name, password1, password2) => {
  let user = await axios.post(`${Base}/user/register`, {
    email,
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

const signoutUser = async () => {
  let user = await axios.get(`${Base}/user/signout`);
  return user;
};

const readIntro = async () => {
  let res = await axios.get(`${Base}/user/intro`);
  return res;
};

const addSurvey = async (
  rating,
  engaging,
  engaging_comments,
  improve,
  relate,
  day_no
) => {
  let survey = await axios.post(`${Base}/survey/add`, {
    rating,
    engaging,
    engaging_comments,
    improve,
    relate,
    day_no,
  });
  return survey;
};

export {
  getUser,
  checkUser,
  saveUser,
  registerUser,
  loginUser,
  signoutUser,
  addSurvey,
  readIntro,
};
