import { login, logout, saveEmail } from "../actions/user";
import { encode as base64encode, decode as base64decode } from 'base-64';
import {
  postRegister,
  postLogin,
  postLogout,
  getConfirmation,
  resendConfirmation,
  resetRegister,
  sendResetPasswordLink,
  resetPassword,
  getGoogleLogin,
} from "../../api/index";
interface DataType {
  error_message: string,
  user: object,
  token: string
}
interface ResponseType {
  data: DataType
}
export const attemptLogin = (user: any) => (dispatch: any) =>
  postLogin(user).then((response: ResponseType) => {
    if (response.data.error_message == undefined) {
      dispatch(login(response.data.user));
      localStorage.setItem("token", response.data.token);
      return true;
    }
  });

export const attemptGoogleLogin = () => () =>
  getGoogleLogin().then((response: { data: any }) => {
    return response.data;
  });

export const attemptEmailVerify = (email: { email: string }) => (dispatch: any) =>
  sendResetPasswordLink(email).then((response: { data: { verifycode: string } }) => {
    dispatch(saveEmail(email.email));
    localStorage.setItem("verifycode", base64encode(response.data.verifycode));
    return true;
  });
export const attemptResetPassword = (user: any) => (dispatch: any) =>
  resetPassword(user)
    .then((response: { data: string }) => {
      if (response.data == "update success")
        return true;
      else return false;
    })
    .catch(() => {
    });

export const attemptLogout = () => (dispatch: any) =>
  postLogout()
    .then(() => {
      dispatch(logout());
    })
    .finally(() => {
    });

export const attemptRegister = (newUser: any) => () => postRegister(newUser);

export const attemptGetConfirmation = (token: string) => (dispatch: any) =>
  getConfirmation(token).then(() => {
  });

export const attemptResendConfirmation = (user: any) => (dispatch: any) =>
  resendConfirmation(user).catch(() => {
  });

export const attemptResetRegister = () => () =>
  resetRegister().catch(() => {
  });
