import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuToggler from '../../UI/MenuToggler/MenuToggler';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuToggler toggle={props.toggleSD} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;