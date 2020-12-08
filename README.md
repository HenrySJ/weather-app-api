# Welcome to the weather-app-api

## Purpose

- Recieve weather data requests from the [weather-app](https://github.com/HenrySJ/weather-app) client via the http protocol.

**_If the db has the weather data for the requested city_**

- Send the weather data to the client in the body of the response

**_Else_**

- The db will request the weather data from [openweathermap.org][https://openweathermap.org]
- Cache the data for future use
- Send the weather data to the client in the body of the response
