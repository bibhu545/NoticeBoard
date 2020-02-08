import { createStore, applyMiddleware } from "redux";
import { commonReducer } from "./Reducers";
import thunk from "redux-thunk";

export const store = createStore(commonReducer, applyMiddleware(thunk))