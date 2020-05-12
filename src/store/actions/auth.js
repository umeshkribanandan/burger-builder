import * as actionTypes from "./actionTypes";
import axios from "axios";

const SIGN_UP_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyHT5p2Now_a2rBx1sne0XwyMmyx_MPOo";
const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyHT5p2Now_a2rBx1sne0XwyMmyx_MPOo";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: data,
  };
};

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    payload: error,
  };
};

const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
const authCheckExpirationTime = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, mode) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    const url = mode === true ? SIGN_UP_URL : SIGN_IN_URL;
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data));
        dispatch(authCheckExpirationTime(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFailure(error.response.data.error));
      });
  };
};
