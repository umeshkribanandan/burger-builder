import { combineReducers } from "redux";
import ingredients from "./reducers/ingredients";
import orders from "./reducers/orders";
import auth from "./reducers/auth";

const rootReducer = combineReducers({
  ingre: ingredients,
  ords: orders,
  auth: auth,
});

export default rootReducer;
