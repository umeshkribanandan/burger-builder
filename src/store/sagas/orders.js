import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import {
  purchaseStart,
  purchaseSuccess,
  purchaseFailure,
  fetchOrdersFailure,
  fetchOrdersSuccess,
  fetchOrdersStart,
} from "../actions";

export function* purchaseSaga(action) {
  try {
    yield put(purchaseStart());
    const response = yield axios.post(
      "/orders.json?auth=" + action.payload.token,
      action.payload.order
    );
    yield put(purchaseSuccess(response.data.name, action.payload.order));
  } catch (error) {
    yield put(purchaseFailure(error));
  }
}

export function* fetchOrdersSaga(action) {
  try {
    yield put(fetchOrdersStart());
    const queryParams =
      "?auth=" +
      action.payload.token +
      '&orderBy="userId"&equalTo="' +
      action.payload.userId +
      '"';
    const response = yield axios.get("/orders.json" + queryParams);
    let tempOrderArray = [];
    for (let key in response.data) {
      tempOrderArray.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(fetchOrdersSuccess(tempOrderArray));
  } catch (error) {
    yield put(fetchOrdersFailure(error));
  }
}
