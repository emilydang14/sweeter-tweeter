import * as actionTypes from "../actions/actionTypes";

//
const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

//
const initialState = {
  user: null,
  error: null,
  loading: false,
};

//SIGN_IN
const SignInStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const SignInSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    error: null,
    loading: false,
  });
};

const SignInFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

//SIGN_OUT

const SignOutStart = (state) => {
  return updateObject(state, { loading: true, error: null });
};
const SignOutSuccess = (state) => {
  return updateObject(state, {
    user: null,
    error: null,
    loading: false,
  });
};

const SignOutFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

export const AuthReducer = (currentState = initialState, action) => {
  switch (action.type) {
    //
    case actionTypes.SIGNIN_START:
      return SignInStart(currentState);
    case actionTypes.SIGNIN_SUCCESS:
      return SignInSuccess(currentState, action);
    case actionTypes.SIGNIN_FAIL:
      return SignInFail(currentState, action);
    //
    case actionTypes.SIGNOUT_START:
      return SignOutStart(currentState);
    case actionTypes.SIGNOUT_SUCCESS:
      return SignOutSuccess(currentState, action);
    case actionTypes.SIGNOUT_FAIL:
      return SignOutFail(currentState, action);
    //
    default:
      return currentState;
  }
};
