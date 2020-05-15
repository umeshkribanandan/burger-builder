import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  authSaga,
  checkAuthTimeoutSaga,
  logoutSaga,
  authCheckSaga,
} from "./auth";

import { initIngredientSaga } from "./ingredients";
import { purchaseSaga, fetchOrdersSaga } from "./orders";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INIT_LOGIN, authSaga);
  yield takeEvery(actionTypes.AUTH_INIT_AUTOCHECK, authCheckSaga);
}

export function* watchIngredients() {
  yield takeEvery(actionTypes.FETCH_INGREDIENTS_INIT, initIngredientSaga);
}
export function* watchOrders() {
  yield all([
    takeLatest(actionTypes.PURCHASE, purchaseSaga),
    takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga),
  ]);
}
