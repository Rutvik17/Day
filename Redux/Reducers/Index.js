import currentUserReducer from './User';
import { combineReducers } from "redux";
import locationReducer from "./Location";
import weatherReducer from "./Weather";
import weatherForecastReducer from "./weatherForecast";

const allReducers = combineReducers({
    currentUser: currentUserReducer,
    currentLocation: locationReducer,
    currentWeather: weatherReducer,
    weatherForecast: weatherForecastReducer
});

export default allReducers;