import { LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";

const userReducer = (state = { user: {}, login: false }, action) => {
  console.log('called from inside the reducer')
  console.log(action.payload)
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        login: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        login: false,
      };
    default:
      return state;
  }
};

export default userReducer;
