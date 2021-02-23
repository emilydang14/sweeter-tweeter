import React from "react";
import classes from "./Header.module.css";
//
import { connect } from "react-redux";
import { SignIn, SignOut } from "../../store/actions/authAction";
//
import logo from "../../assets/content_imgs/logo.png";
//
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
//
const Header = (props) => {
  return (
    <div className={classes.Header}>
      <div className={classes.Header_left}>
        <img
          className={classes.Header_logo_img}
          src={logo}
          alt="sweeter-tweeter-logo"
        />
      </div>
      {props.loading ? (
        <Spinner />
      ) : (
        <div className={classes.Header_right}>
          {props.isAuth ? (
            <h3>Welcome, {props.user.name}</h3>
          ) : props.err ? (
            <p>{props.err.message}</p>
          ) : (
            <h3>Hi there, </h3>
          )}
          <div className={classes.Header_button_container}>
            {!props.isAuth ? (
              <Button
                name="Sign In with Google"
                shape="oval"
                onClick={() => {
                  props.onSignIn();
                }}
              />
            ) : (
              <Button
                name="Sign Out"
                shape="oval"
                onClick={() => {
                  props.onSignOut();
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
    err: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: () => dispatch(SignIn()),
    onSignOut: () => dispatch(SignOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
