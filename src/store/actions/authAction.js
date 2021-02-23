import * as actionTypes from "./actionTypes";
import { authentication, Googleprovider } from "../../firebase/firebase";

//SIGN_IN
export const SignInStart = () => {
  return {
    type: actionTypes.SIGNIN_START,
  };
};

export const SignInSuccess = (user) => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    user,
  };
};
export const SignInFail = (error) => {
  return {
    type: actionTypes.SIGNIN_FAIL,
    error: {
      code: error.code,
      message: error.message,
    },
  };
};

export const SignIn = () => {
  return (dispatch) => {
    dispatch(SignInStart());
    authentication
      .signInWithPopup(Googleprovider)
      .then(async (res) => {
        console.log(res);
        await dispatch(SignInSuccess(res.additionalUserInfo.profile));
      })
      .catch((err) => {
        console.log("SIGNIN_ERR", err);
        dispatch(SignInFail(err));
      });
  };
};

//SIGN_OUT
export const SignOutStart = () => {
  return {
    type: actionTypes.SIGNOUT_START,
  };
};

export const SignOutSuccess = () => {
  return {
    type: actionTypes.SIGNOUT_SUCCESS,
  };
};
export const SignOutFail = (error) => {
  return {
    type: actionTypes.SIGNOUT_FAIL,
    error: {
      code: error.code,
      message: error.message,
    },
  };
};

export const SignOut = () => {
  return (dispatch) => {
    dispatch(SignOutStart());
    authentication
      .signOut()
      .then(() => {
        dispatch(SignOutSuccess());
        localStorage.clear();
      })
      .catch((err) => {
        console.log("SIGNOUT_ERR", err);
        dispatch(SignOutFail(err));
      });
  };
};
