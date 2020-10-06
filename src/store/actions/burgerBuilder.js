import * as actionTypes from "./actionTypes";


export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
};

export const fetchIngredientPricesFailed = () => {
  return {
      type: actionTypes.FETCH_INGREDIENT_PRICES_FAILED
  }
};

export const setIngPrices = (prices) => {
  return {
    type: actionTypes.SET_ING_PRICES,
    prices: prices
  }
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  };
};

export const initIngredientPrices = () => {
  return {
    type: actionTypes.INIT_INGREDIENT_PRICES
  };
};
