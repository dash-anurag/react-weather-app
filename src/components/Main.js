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

  const fetchLocation = async (location) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.REACT_APP_MAPBOX_API}&limit=1`;

    const response = await fetch(url);
    const responseData = await response.json();

    if (responseData.features.length === 0) {
      return { latitude: null, longitude: null };
    }

    setCity(responseData.features[0].place_name);

    return {
      latitude: responseData.features[0].center[1],
      longitude: responseData.features[0].center[0],
    };
  };

  const getWeather = async (latitude, longitude, location) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    if (!latitude || !longitude) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    }

    const response = await fetch(url);

    if (response.status === 404) {
      setError("Please enter a valid city name!");
      return;
    }

    if (!response.ok) {
      setError("Something went wrong!");
      return;
    }

    const responseData = await response.json();
    setWeather(responseData.main);
    // setCity(responseData.name);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setWeather(null);
    setCity(null);
    setError(null);

    const location = e.target.elements.location.value.trim();

    if (location.length === 0) {
      setError("Please enter a city name!");
      return;
    }

    const { latitude, longitude } = await fetchLocation(location);
    getWeather(latitude, longitude, location);
  };

  return (
    <div className="main">
      <Header />
      <Content>
        <DateTime />
        <Tagline />
        <Context.Provider
          value={{
            onSubmitHandler,
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
