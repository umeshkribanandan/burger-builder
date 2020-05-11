import * as actionTypes from "../actions";

const initialState = {
  ingredients: {
    meat: 0,
    bacon: 0,
    cheese: 0,
    salad: 0,
  },
  totalPrice: 4,
};

const INGREDEINT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9,
  meat: 1.5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice: state.totalPrice + INGREDEINT_PRICE[action.payload],
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (!state.ingredients[action.payload]) return state;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice: state.totalPrice - INGREDEINT_PRICE[action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
