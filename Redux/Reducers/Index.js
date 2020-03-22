import currentUserReducer from './User';
import { combineReducers } from "redux";
import locationReducer from "./Location";
import weatherReducer from "./Weather";

const allReducers = combineReducers({
    currentUser: currentUserReducer,
    currentLocation: locationReducer,
    currentWeather: weatherReducer
});

export default allReducers;