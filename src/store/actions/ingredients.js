import * as actionTypes from "./actionTypes";

export const addIngredient = (igType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: igType,
  };
};

export const removeIngredient = (igType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: igType,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredient = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_INIT,
  };
  // return (dispatch) => {
  //   axios
  //     .get("/ingredients.json")
  //     .then((response) => {
  //       dispatch(setIngredients(response.data));
  //     })
  //     .catch((error) => {
  //       dispatch(fetchIngredientsFailed(error));
  //     });
  // };
};
