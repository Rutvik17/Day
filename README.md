## Day

This is a `React-Native` project with `firebase authentication`

## Install

`1. Clone this repository`

`2. Add a FirebaseConfig.js file to the root folder`

## Usage

Add a `FirebaseConfig.js` file in the project root folder with your firebase app config object
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN_NAME",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSENGER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

export default firebaseConfig;
```
`3. Add a OpenWeatherConfig.js file to the root folder`

## Usage

Add a `OpenWeatherConfig.js` file in the project root folder with your api key from open weather map

https://openweathermap.org/
```javascript
export const openWeatherConfig = {
  apiKey: 'API_KEY_FROM_OPEN_WEATHER_MAP'
};
```

`4. Add a NewsConfig.js file to the root folder`

## Usage

Add a `NewsConfig.js` file in the project root folder with your api key from `https://newsapi.org/`

https://newsapi.org/
```javascript
export const newsConfig = {
  apiKey: 'API_KEY_FROM_NEWS_ORG'
};
```

`5. npm install -g expo-cli`

`6. npm install`

`7. npm start`
