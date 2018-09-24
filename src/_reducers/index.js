import { combineReducers } from "redux";
import counterReducer from "./counter";
import barrasReducer from "./barras";
import costosReducer from "./costos";

const rootReducer = combineReducers({
  count: counterReducer,
  barras: barrasReducer,
  costos: costosReducer
});

export default rootReducer;
