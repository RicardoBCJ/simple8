import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import usersReducer from "./usersReducers";
import helpRequestReducer from "./helpRequestReducer";

const rootReducer = combineReducers({
  todos: todosReducer,
  user: usersReducer,
  helpRequests: helpRequestReducer,
});

export default rootReducer;
