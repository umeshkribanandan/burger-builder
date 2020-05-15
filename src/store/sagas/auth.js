import { delay } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import {
  authSuccess,
  authCheckExpirationTime,
  authFailure,
  authLogout,
  authLogoutSucceed,
  authStart,
} from "../actions";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationTime");
  yield call([localStorage, "removeItem"], "userId");
  yield put(authLogoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.payload * 1000);
  yield put(authLogout());
}

export function* authSaga(action) {
  yield put(authStart());
  try {
    const response = yield axios.post(
      action.payload.url,
      action.payload.authData
    );
    const expirationTime = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    localStorage.setItem("token", response.data.idToken);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("userId", response.data.localId);
    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(authCheckExpirationTime(response.data.expiresIn));
  } catch (error) {
    yield put(authFailure(error.response.data.error));
  }
}

export function* authCheckSaga(action) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token) {
    yield put(authLogout());
  } else {
    const expirationTime = new Date(localStorage.getItem("expirationTime"));
    if (expirationTime > new Date()) {
      yield put(authSuccess(token, userId));
      yield put(
        authCheckExpirationTime(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(authLogout());
    }
  }
}
