import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/spinner/spinner";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from '../../shared/utility';

const initialControls = {
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Mail Address",
    },
    value: "",
    validation: {
      required: true,
      isEmail: true,
    },
    touched: false,
    valid: false,
  },
  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Password",
    },
    value: "",
    validation: {
      required: true,
      minLength: 6,
      isNumeric: true
    },
    touched: false,
    valid: false,
  },
};

const auth = props => {
  const [controls, setControls] = useState(initialControls);
  const [isSignUp, setIsSignUp] = useState(true);

  const { buildingBurger, authRedirectPath, onSetRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetRedirectPath]);

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      })
    });
    
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignUp
    );
  };

    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => inputChangedHandler(event, formElement.id)}
      />
    ));

    if (props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
      errorMessage = <p>{props.error.message}</p>;
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
      authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={switchAuthModeHandler}>
          SWITCH TO {isSignUp ? "SIGN-IN" : "SIGN-UP"}
        </Button>
      </div>
    );

}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);