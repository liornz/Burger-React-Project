import React from 'react';
import classes from './MenuToggler.css';


const menuToggler = (props) => (
    <div onClick={props.toggle} className={classes.MenuToggler}>
        <i className="fas fa-bars"></i>
    </div>
);

export default menuToggler;