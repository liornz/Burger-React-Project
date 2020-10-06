import React from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

        const ingredientSummary = Object.keys(props.ingredients)
    .map(igKeys => {return (
    <li key={igKeys}><span style={{textTransform: 'capitalize'}}>{igKeys}</span>: {props.ingredients[igKeys]}</li>);
    });
    return (
        <Auxilliary>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p><strong>Total Price: {props.price.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button 
            btnType={'Danger'}
            clicked={props.purchaseCancelled}
            >CANCEL</Button>
            <Button 
            btnType={'Success'}
            clicked={props.purchaseContinued}
            >CONTINUE</Button>
        </Auxilliary>
        );
}

export default orderSummary;