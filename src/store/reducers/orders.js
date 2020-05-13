import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { loading: false, purchased: false });
};

const purchaseStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseSuccess = (state, action) => {
  const newObject = {
    ...action.payload.orderData,
    id: action.payload.id,
  };
  return updateObject(state, {
    orders: state.orders.concat(newObject),
    loading: false,
    purchased: true,
  });
};

const purchaseFailure = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { orders: [], loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: state.orders.concat(action.payload),
    loading: false,
  });
};

const fetchOrdersFailure = (state, action) => {
  return updateObject(state, { error: action.payload, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_START:
      return purchaseStart(state, action);

    case actionTypes.PURCHASE_SUCCESS:
      return purchaseSuccess(state, action);

    case actionTypes.PURCHASE_FAILURE:
      return purchaseFailure(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAILURE:
      return fetchOrdersFailure(state, action);

    default:
      return state;
  }
};

export default reducer;
