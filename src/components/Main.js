import React, { useEffect } from "react";
import axios from "axios";

import Header from "./Header";
import Content from "./Content";
import WeatherSearch from "./WeatherSearch";

const Main = () => {
  useEffect(() => {
    const api_call = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Bhubaneswar&appid=${process.env.REACT_APP_API_KEY}`;

      const request = await axios.get(url);

      const response = await request;
      console.log(response.data);
    };

    api_call();
  });

  return (
    <div className="main">
      <Header />
      <Content>
        <WeatherSearch />
      </Content>
    </div>
  );
};

export default Main;
