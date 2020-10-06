import React, { useState } from "react";
import { connect } from "react-redux";
import Auxilliary from "../Auxilliary/Auxilliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerToggler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

    return (
      <Auxilliary>
        <Toolbar
          isAuth={props.isAuthenticated}
          toggleSD={sideDrawerToggler}
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{props.children}</main>
      </Auxilliary>
    );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
