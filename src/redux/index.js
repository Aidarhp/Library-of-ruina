import { applyMiddleware, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";

const itinitial = {}
const composeFunk = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composeEnhances = composeFunk(applyMiddleware(thunk))

const store = createStore(rootReducer(),itinitial,composeEnhances)

export default store;