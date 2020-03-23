import {openWeatherConfig} from "../OpenWeatherConfig";

export function getCurrentWeather (latitude, longitude) {
    return new Promise((resolve, reject) => {
        return fetch('https://api.openweathermap.org/data/2.5/weather?lat='
            + latitude + '&lon='
            + longitude + '&appid='
            + openWeatherConfig.apiKey + '&units=metric')
            .then((response) => response.json())
            .then((weather) => {
                console.log(weather);
                resolve(weather);
            }, error => {
                reject(error);
            });
    });
}