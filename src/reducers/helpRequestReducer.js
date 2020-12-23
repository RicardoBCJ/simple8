import {
  LOAD_HELP_REQUESTS,
  LOAD_HELP_REQUEST,
  ADD_HELP_REQUESTS,
  UPDATE_HELP_REQUESTS,
  DELETE_HELP_REQUESTS,
  JOIN_HELP_REQUEST,
} from "../actions/actionTypes";

const helpRequestReducer = (state = { helpRequests: [] }, action) => {
  console.log(action);
  console.log("from the reducer");
  switch (action.type) {
    case LOAD_HELP_REQUESTS:
      return action.helpRequests;

    case LOAD_HELP_REQUEST:
      return {
        ...state,
      };

    case ADD_HELP_REQUESTS:
      return [...state, action.helpRequest];

    case UPDATE_HELP_REQUESTS:
      return state.map((helpReq) =>
        helpReq.id === action.response
          ? { ...helpReq, condition: "completed" }
          : helpReq
      );

    case DELETE_HELP_REQUESTS:
      return {
        ...state,
      };

    case JOIN_HELP_REQUEST:
      return state.map((helpReq) =>
        helpReq.id === action.response
          ? { ...helpReq, helpers: action.helpers }
          : helpReq
      );

    default:
      return state;
  }
};

export default helpRequestReducer;
