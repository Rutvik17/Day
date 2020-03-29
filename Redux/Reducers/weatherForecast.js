const weatherForecastReducer = (state = {}, action) => {
    switch (action.type) {
        case 'WEATHER_FORECAST':
            return state = action.load;
        default:
            return state;
    }
};

export default weatherForecastReducer;