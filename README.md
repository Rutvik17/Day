## Day

This is a `React-Native` project with `firebase authentication` that 
will ask for location permissions and display weather based on the user location using the `https://openweathermap.org/ api` 

`The purpose of this project is to share code, collaborate with people in the community and to be a motivation for people to create something amazing! ❤️`

![day](https://user-images.githubusercontent.com/19266929/77842324-c093d600-715e-11ea-8198-09455e0d3565.gif)
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

`4. npm install -g expo-cli`

`5. npm install`

`6. npm start`
