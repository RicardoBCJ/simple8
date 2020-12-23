import { LOGIN_USER, LOGOUT_USER, LOAD_USERS } from "../actions/actionTypes";

export const loginUser = (userObj) => {
  return {
    type: LOGIN_USER,
    payload: userObj,
  };
};

export const logOutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const loadUsers = () => {
  return {
    type: LOAD_USERS,
  };
};
