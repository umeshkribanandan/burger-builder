import * as actionTypes from "./actionTypes";

const SIGN_UP_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyHT5p2Now_a2rBx1sne0XwyMmyx_MPOo";
const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyHT5p2Now_a2rBx1sne0XwyMmyx_MPOo";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { idToken: token, localId: userId },
  };
};

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    payload: error,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT,
  };
};

export const authLogoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckExpirationTime = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    payload: expirationTime,
  };
  // return (dispatch) => {
  //   setTimeout(() => {
  //     dispatch(authLogout());
  //   }, expirationTime * 1000);
  // };
};

export const auth = (email, password, mode) => {
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  const url = mode === true ? SIGN_UP_URL : SIGN_IN_URL;
  return {
    type: actionTypes.AUTH_INIT_LOGIN,
    payload: { authData, url },
  };
  //return (dispatch) => {
  //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  // axios
  //   .post(url, authData)
  //   .then((response) => {
  //     const expirationTime = new Date(
  //       new Date().getTime() + response.data.expiresIn * 1000
  //     );
  //     localStorage.setItem("token", response.data.idToken);
  //     localStorage.setItem("expirationTime", expirationTime);
  //     localStorage.setItem("userId", response.data.localId);
  //     dispatch(authSuccess(response.data.idToken, response.data.localId));
  //     dispatch(authCheckExpirationTime(response.data.expiresIn));
  //   })
  //   .catch((error) => {
  //     dispatch(authFailure(error.response.data.error));
  //   });
  //};
};

export const authCheck = () => {
  return {
    type: actionTypes.AUTH_INIT_AUTOCHECK,
  };
  // return (dispatch) => {
  //   const token = localStorage.getItem("token");
  //   const userId = localStorage.getItem("userId");
  //   if (!token) {
  //     dispatch(authLogout());
  //   } else {
  //     const expirationTime = new Date(localStorage.getItem("expirationTime"));
  //     if (expirationTime > new Date()) {
  //       dispatch(authSuccess(token, userId));
  //       dispatch(
  //         authCheckExpirationTime(
  //           (expirationTime.getTime() - new Date().getTime()) / 1000
  //         )
  //       );
  //     } else {
  //       dispatch(authLogout());
  //     }
  //   }
  // };
};
