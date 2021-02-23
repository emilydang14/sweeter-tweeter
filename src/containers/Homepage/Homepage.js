import React from "react";
import classes from "./Homepage.module.css";
//
import { connect } from "react-redux";
import { SignIn } from "../../store/actions/authAction";
//
import Button from "../../components/UI/Button/Button";
import scroll from "../../assets/content_imgs/scroll.png";
import Spinner from "../../components/UI/Spinner/Spinner";

const Homepage = (props) => {
  return (
    <div className={classes.Homepage}>
      <div className={classes.Homepage_footer}>
        <div className={classes.Homepage_footer_btn}>
          <Button
            name="by Emily Dang"
            shape="oval"
            onClick={() => {
              console.log("emilydang.dev");
            }}
          />
        </div>
        <div className={classes.Homepage_footer_texts}>
          <p className={classes.Homepage_footer_texts_quote}>One tweet a day</p>
          <p className={classes.Homepage_footer_texts_quote}>
            Take your worries away
          </p>

          {!props.isAuth && !props.loading ? (
            <h2
              className={classes.Homepage_footer_texts_direction}
              onClick={() => props.onSignIn()}
            >
              - Sign in to continue -
            </h2>
          ) : props.loading ? (
            <Spinner />
          ) : (
            <>
              <h2 className={classes.Homepage_footer_texts_direction}>
                Let's tweet!
              </h2>
              <img className={classes.scroll} src={scroll} alt="scroll" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user !== null,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: () => dispatch(SignIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
