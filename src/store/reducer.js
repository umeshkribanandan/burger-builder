import { combineReducers } from "redux";
import ingredients from "./reducers/ingredients";
import orders from "./reducers/orders";

const rootReducer = combineReducers({
  ingre: ingredients,
  orders: orders,
});

export default rootReducer;
