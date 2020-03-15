import currentUserReducer from './User';
import { combineReducers } from "redux";

const allReducers = combineReducers({
    currentUser: currentUserReducer
});

export default allReducers;