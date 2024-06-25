// src/WeatherApp.js

import { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [fetchWeather, setFetchWeather] = useState(false);

  useEffect(() => {
    if (!fetchWeather) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b627d659f03f65cb0e49590a3d17dff
&units=metric`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError("Could not fetch weather data. Please try again.");
        setWeather(null);
      } finally {
        setFetchWeather(false);
      }
    };

    fetchData();
  }, [fetchWeather, city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchWeather(true);
    console.log(weather);
  };

  return (
    <>
      <div className="flex p-10    justify-center ">
        <div className="flex h-full w-96  flex-col justify-center  items-center mt-10 border-2  border-red-800 p-10  rounded-md">
          <h1 className="text-3xl font-bold mb-6 ">Weather App</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="p-2 border rounded  border-red-800 mb-4 text-lg"
            />
            <button
              type="submit"
              className="p-2 m-4 bg-red-800 text-white rounded text-lg"
            >
              Get Weather
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {weather && (
            <div className="mt-6 p-10 border-2 text-white bg-red-800 rounded-md">
              <h2 className="text-2xl font-bold">{weather.name}</h2>
              <p className="text-lg">Temperature: {weather.main.temp}°C</p>
              <p className="text-lg">
                Weather: {weather.weather[0].description}
              </p>
              <p className="text-lg">Humidity: {weather.main.humidity}%</p>
              <p className="text-lg">Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
