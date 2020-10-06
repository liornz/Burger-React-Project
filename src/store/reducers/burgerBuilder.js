import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  ingPrices: null,
  totalPrice: 4,
  errorIngs: false,
  errorPrices: false,
  building: false
};

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }; 
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState =  {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + state.ingPrices[action.ingredientName],
    building: true
  };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }; 
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt =  {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - state.ingPrices[action.ingredientName],
    building: true
  };
    return updateObject(state, updatedSt);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    errorIngs: false,
    building: false
    });
};

const fetchIngredientFaild = (state, action) => {
  return updateObject(state, { errorIngs: true });
};

const fetchIngredientPricesFaild = (state, action) => {
  return updateObject(state, { errorPrices: true });
};

const setIngredientPrices = (state, action) => {
  return updateObject(state, { ingPrices: action.prices, errorPrices: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredient(state, action); 
    case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFaild(state, action);  
    case actionTypes.FETCH_INGREDIENT_PRICES_FAILED: return fetchIngredientPricesFaild(state, action);  
    case actionTypes.SET_ING_PRICES: return setIngredientPrices(state, action);
    default: return state;
  }
};

export default reducer;
