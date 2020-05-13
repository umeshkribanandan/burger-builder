import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDEINT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9,
  meat: 1.5,
};

const addIngredient = (state, action) => {
  const updateIngredient = {
    [action.payload]: state.ingredients[action.payload] + 1,
  };
  const updateIngredients = updateObject(state.ingredients, updateIngredient);
  const updatedState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDEINT_PRICE[action.payload],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  if (!state.ingredients[action.payload]) return state;
  const updateIng = {
    [action.payload]: state.ingredients[action.payload] - 1,
  };
  const updateIngs = updateObject(state.ingredients, updateIng);
  const updatedSt = {
    ingredients: updateIngs,
    totalPrice: state.totalPrice - INGREDEINT_PRICE[action.payload],
    building: true,
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload,
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
