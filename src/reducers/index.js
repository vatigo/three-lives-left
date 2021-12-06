import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailReducer from "./detailReducers";

const rootReducer = combineReducers({
  games: gamesReducer,
  detail: detailReducer,
});

export default rootReducer;
