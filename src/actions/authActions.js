import * as types from "./actionTypes";
// this function has an authentication request action type
const authRequest = () => {
  return {
    type: types.AUTHENTICATION_REQUEST,
  };
};
// this function has an authentication success action type. When there's a success in correct credentials, the server passes a user and token.
const authSuccess = (user, token) => {
  return {
    type: types.AUTHENTICATION_SUCCESS,
    user: user,
    token: token,
  };
};
//this function has an authentication failure action type. When there are incorrect credentials, the server passes errors.
const authFailure = (errors) => {
  return {
    type: types.AUTHENTICATION_FAILURE,
    errors: errors,
  };
};
