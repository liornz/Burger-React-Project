import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Auxilliary from "../../hoc/Auxilliary/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

export const burgerBuilder = props => {
  const [purchasing, setPurchasing ] = useState(false);

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const errorIngs = useSelector(state => state.burgerBuilder.errorIngs);
  const errorPrices = useSelector(state => state.burgerBuilder.errorPrices);
  const ingPrices = useSelector(state => state.burgerBuilder.ingPrices);
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  

  const dispatch = useDispatch();

  const onAddIngredient = (ingName) => dispatch(actions.addIngredient(ingName));
  const onRemoveIngredient = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
  const onInitIngredientPrices = useCallback(() => dispatch(actions.initIngredientPrices()), []);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  useEffect(() => {
    onInitIngredientPrices();
  }, [onInitIngredientPrices]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
    
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

    const disabledInfo = { ...ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = (errorIngs || errorPrices) ? (
      errorIngs ? <p>Ingredients can't be loaded!</p> : <p>Ingredient Prices can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (ings && ingPrices ) { 
      burger = (
        <Auxilliary>
          <Burger ingredients={ings} />
          <BuildControls
            addedIngredient={onAddIngredient}
            removedIngredient={onRemoveIngredient}
            disabled={disabledInfo}
            price={price}
            purchasable={updatePurchaseState(ings)}
            ordered={purchaseHandler}
            ingredients={ings}
            isAuth={isAuthenticated}
          />
        </Auxilliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={price}
        />
      );
    }

    return (
      <Auxilliary>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxilliary>
    );
}



export default  withErrorHandler(burgerBuilder, axios);
