import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START,
  };
};

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    payload: { id: id, orderData: orderData },
  };
};

export const purchaseFailure = () => {
  return {
    type: actionTypes.PURCHASE_FAILURE,
  };
};

export const purchase = (order, token) => {
  return {
    type: actionTypes.PURCHASE,
    payload: { token, order },
  };
  // return (dispatch) => {
  //   dispatch(purchaseStart());
  //   axios
  //     .post("/orders.json?auth=" + token, order)
  //     .then((response) => {
  //       dispatch(purchaseSuccess(response.data.name, order));
  //       // this.setState({ loading: false });
  //       // this.props.history.push("/");
  //     })
  //     .catch((error) => {
  //       dispatch(purchaseFailure(error));
  //       // this.setState({ loading: false });
  //     });
  // };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: data,
  };
};

export const fetchOrdersFailure = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
    payload: { token, userId },
  };
  // return (dispatch) => {
  //   dispatch(fetchOrdersStart());
  //   const queryParams =
  //     "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  //   axios
  //     .get("/orders.json" + queryParams)
  //     .then((response) => {
  //       let tempOrderArray = [];
  //       for (let key in response.data) {
  //         tempOrderArray.push({
  //           ...response.data[key],
  //           id: key,
  //         });
  //       }
  //       dispatch(fetchOrdersSuccess(tempOrderArray));
  //     })
  //     .catch((error) => {
  //       dispatch(fetchOrdersFailure(error));
  //     });
  // };
};
