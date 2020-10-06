import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import * as actions from "../actions/index";


export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get("/ingredients.json");
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientFailed());
    }
}

export function* initIngredientPricesSaga(action) {
    try {
        const response = yield axios.get("/prices.json");
        yield put(actions.setIngPrices(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientPricesFailed());
    }
}