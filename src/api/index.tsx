import axios from "axios";

const postLogin = (user: object) => {
  return axios.post("http://localhost:8000/api/login", user);
}
const getGoogleLogin = () => {
  return axios.get("http://localhost:8000/api/google");
}
const sendResetPasswordLink = (email:object) =>
  axios.post("http://localhost:8000/api/forgot", email);
const resetPassword = (user:object) =>
  axios.post(`http://localhost:8000/api/passwordreset`, user);
const postLogout = () => axios.post("/auth/logout");
const postRegister = (user: object) => {
  return axios.post("http://localhost:8000/api/register", user);
};
const getConfirmation = (token:string) => axios.get(`/auth/confirmation/${token}`);
const resendConfirmation = (user: object) => axios.post("http://localhost:8000/api/resend", user);
const resetRegister = () => axios.post("/auth/register/reset");
const getUser = (token:string) => {
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
  return axios.get("http://localhost:8000/api/user");
};

export {
  postLogin,
  sendResetPasswordLink,
  resetPassword,
  postLogout,
  postRegister,
  getConfirmation,
  resendConfirmation,
  getUser,
  resetRegister,
  getGoogleLogin,
};
