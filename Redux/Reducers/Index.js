import currentUserReducer from './User';
import { combineReducers } from "redux";
import locationReducer from "./Location";

const allReducers = combineReducers({
    currentUser: currentUserReducer,
    currentLocation: locationReducer
});

export default allReducers;