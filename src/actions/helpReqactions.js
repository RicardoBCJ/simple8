import {
  LOAD_HELP_REQUESTS,
  LOAD_HELP_REQUEST,
  ADD_HELP_REQUESTS,
  UPDATE_HELP_REQUESTS,
  DELETE_HELP_REQUESTS,
  JOIN_HELP_REQUEST,
} from "./actionTypes";

export const loadRequests = (helpReqs) => {
  return {
    type: LOAD_HELP_REQUESTS,
    helpRequests: helpReqs,
  };
};

export const addHelpRequest = (helpReq) => {
  return {
    type: ADD_HELP_REQUESTS,
    helpRequest: helpReq,
  };
};

export const uppdateRequest = (res) => {
  return {
    type: UPDATE_HELP_REQUESTS,
    response: res,
  };
};

export const joinHelpRequest = (res, helpers) => {
  return {
    type: JOIN_HELP_REQUEST,
    response: res,
    helpers: helpers,
  };
};
