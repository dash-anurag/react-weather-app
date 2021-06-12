import React, { useState } from "react";

import Context from "../Context";

import Header from "./Header";
import Content from "./Content";
import WeatherSearch from "./WeatherSearch";
import WeatherData from "./WeatherData";
import DateTime from "./DateTime";
import Tagline from "./Tagline";
import Error from "./Error";
import Footer from "./Footer";

const Main = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  const fetchLocation = async (e) => {
    e.preventDefault();
    setError(null);
    const location = e.target.elements.location.value.trim();

    if (location.length === 0) {
      setError("Please enter a city name!");
      setWeather(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    const response = await fetch(url);

    if (response.status === 404) {
      setWeather(null);
      setCity(null);
      setError("Please enter a valid city name!");
      return;
    }

    if (!response.ok) {
      setWeather(null);
      setCity(null);
      setError("Something went wrong!");
      return;
    }

    const responseData = await response.json();
    setWeather(responseData.main);
    setCity(responseData.name);
  };

  return (
    <div className="main">
      <Header />
      <Content>
        <DateTime />
        <Tagline />
        <Context.Provider
          value={{
            fetchLocation,
            weather,
            city,
          }}
        >
          <WeatherSearch />
          {weather && <WeatherData />}
          {error && <Error error={error} />}
        </Context.Provider>
        <Footer />
      </Content>
    </div>
  );
};

export default Main;
