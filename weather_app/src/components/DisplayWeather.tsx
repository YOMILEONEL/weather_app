import React from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { WiDayCloudyWindy } from "react-icons/wi";
import {BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsCloudFog2Fill,} from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";

interface WeatherDataProps {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const DisplayWeather: React.FC = () => {
  const api_key = "0cc86d16bf572f78cdc96c096c7627e5";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";
  

  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCity, setSearchCity] = useState("");

  const fetchWeatherData = async (city: string) => {
    const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  const handleSearch = async () => {
    if (searchCity.trim() === "") {
      alert("Please enter a city.");
      return;
    }
    try {
      setIsLoading(true);
      const data = await fetchWeatherData(searchCity);
      setWeatherData(data);
    } catch (error) {
      alert("City not found. Please try again.");
    } finally {
      setIsLoading(false);
      setSearchCity("");
    }
  };

  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;
      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102C57";
        break;
      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };

  return (
    <div className="allBody">
      <h1>STEVE LEONEL Weather-App</h1>
      <div className="container">
        <div className="searchArea">
          <input
            type="text"
            placeholder="Enter a City"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <div className="searchCircle" onClick={handleSearch}>
            <AiOutlineSearch className="searchIcon" />
          </div>
        </div>

        {isLoading ? (
          <div className="loading">
            <RiLoaderFill className="loadingIcon" />
            <p>Loading...</p>
          </div>
        ) : weatherData ? (
          <>
            <div className="weatherArea">
              <h1>{weatherData.name}</h1>
              <span>{weatherData.sys.country}</span>
              <div className="icon">{iconChanger(weatherData.weather[0].main)}</div>
              <h1>{weatherData.main.temp.toFixed(0)}°C</h1>
              <h2>{weatherData.weather[0].main}</h2>
            </div>

            <div className="bottomInfoArea">
              <div className="humidityLevel">
                <WiHumidity className="windIcon" />
                <div className="humidInfo">
                  <h1>{weatherData.main.humidity}%</h1>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wind">
                <WiDayCloudyWindy className="windIcon" />
                <div className="humidInfo">
                  <h1>{weatherData.wind.speed} km/h</h1>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="weatherArea">
              <h1>Berlin</h1>
              <span>DE</span>
              <div className="icon">{iconChanger("Cloudy")}</div>
              <h1>18°C</h1>
              <h2>Cloudy</h2>
            </div>

            <div className="bottomInfoArea">
              <div className="humidityLevel">
                <WiHumidity className="windIcon" />
                <div className="humidInfo">
                  <h1>60%</h1>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind">
                <WiDayCloudyWindy className="windIcon" />
                <div className="humidInfo">
                  <h1>2.35 km/h</h1>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayWeather;
