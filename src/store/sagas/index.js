import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga, initIngredientPricesSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './orders';

export function* watchAuth() {
    yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)   
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
    yield takeEvery(actionTypes.INIT_INGREDIENT_PRICES, initIngredientPricesSaga);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}

