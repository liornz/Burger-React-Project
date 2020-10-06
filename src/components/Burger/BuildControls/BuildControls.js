import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
]


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p><strong>Current Price: {props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
        <BuildControl 
        key={ctrl.label} 
        label={ctrl.label}
        added={() => {props.addedIngredient(ctrl.type)}}
        removed={() => {props.removedIngredient(ctrl.type)}}
        disabled={props.disabled[ctrl.type]}
        currentAmount={props.ingredients[ctrl.type]} 
        />))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
        >{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;