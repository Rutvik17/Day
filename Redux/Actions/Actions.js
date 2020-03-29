export const currentUser = (user) => {
    return {
      type: 'CURRENT_USER',
      load: user
    };
};

export const currentLocationAction = (loc) => {
    return {
        type: 'CURRENT_LOCATION',
        load: loc
    };
};

export const currentWeather = (weather) => {
    return {
        type: 'CURRENT_WEATHER',
        load: weather
    }
};

export const weatherForecast = (weather) => {
    return {
        type: 'WEATHER_FORECAST',
        load: weather
    }
};

export const topHeadlines = (news) => {
    return {
        type: 'TOP_HEADLINES',
        load: news
    }
};