import currentUserReducer from './User';
import { combineReducers } from "redux";
import locationReducer from "./Location";
import weatherReducer from "./Weather";
import weatherForecastReducer from "./weatherForecast";
import newsReducer from "./News";

const allReducers = combineReducers({
    currentUser: currentUserReducer,
    currentLocation: locationReducer,
    currentWeather: weatherReducer,
    weatherForecast: weatherForecastReducer,
    news: newsReducer
});

export default allReducers;