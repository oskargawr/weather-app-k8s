import './CurrentWeather.css';
import React, {useState} from 'react'
import SunsetSunrise from './SunsetSunrise';
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SpaIcon from "@mui/icons-material/Spa";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CompressIcon from "@mui/icons-material/Compress";
import TemperatureSlider from './TemperatureSlider';

function getAQIColor(aqi) {
  switch (aqi) {
    case "Good":
      return "#b3e6cc"; // Light Green
    case "Moderate":
      return "#ffffcc"; // Light Yellow
    case "Unhealthy for Sensitive Groups":
      return "#ffcc99"; // Light Orange
    case "Unhealthy":
      return "#ff9999"; // Light Red
    case "Very Unhealthy":
      return "#cc99cc"; // Light Purple
    case "Hazardous":
      return "#660066"; // Dark Purple
    default:
      return "#ffffff"; // White
  }
}

const toCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };


function CurrentWeather({data}) {
    const celsius = (data?.main?.temp - 273.15).toFixed(1);
    const [expanded, setExpanded] = useState(false);
    console.log("dataw: ", data);
    const handleExpand = (event) => {
        event.stopPropagation();
        setExpanded(!expanded);
    }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12 mx-auto">
          <div className="main-card card shadow-sm p-3 rounded bg-transparent">
            <div className="card-body d-flex justify-content-between align-items-start">
              <div className="weather-info-main">
                <div className="weather-info-left">
                  <h5 className="weather-info-main-city card-title fw-bold">
                    {data.city}
                  </h5>
                  <p className="weather-info-main-temperature card-text">
                    {celsius}°C
                  </p>
                </div>
                <div className="img-container">
                  <img
                    src={`/icons/${data.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </div>
              </div>
            </div>
              <div>
          <div className="weather-details-grid">
            <div className="weather-details feels-like">
              <div className="feels-like-box">
                <DeviceThermostatIcon
                  className="feels-like-icon"
                  fontSize="small"
                  sx={{ color: "#fff", opacity: "0.8" }}
                />
                <p className="p-feels-like fs-6 fw-normal">Feels like:</p>
              </div>
              <p className="fs-1 text-white">{toCelsius(data.main.feels_like)}°C</p>
              <p className="text-white opacity-75 fw-normal fs-5 text-center">
                {data.weather[0].description}
              </p>
            </div>
            <div className="weather-details min-max">
              <TemperatureSlider data={data.main} />
            </div>
            <div className="weather-details air-pollution">
              <SpaIcon
                className="feels-like-icon"
                fontSize="small"
                sx={{ color: "#fff", opacity: "0.8" }}
              />
              <p className="text-white opacity-75 fs- fw-normal">Air Quality:</p>
              <p
                className="fs-4 fw-bold"
                style={{ color: getAQIColor(data.airPollution.main.aqi)}}
              >
                {data.airPollution.main.aqi}
              </p>
            </div>
            <div className="weather-details pressure">
              <CompressIcon
                className="feels-like-icon"
                fontSize="small"
                sx={{ color: "#fff", opacity: "0.8" }}
              />
              <p className="p-feels-like fs-6 fw-normal opacity-75">Pressure:</p>
              <p className="fs-4 text-white">{data.main.pressure} hPa</p>
            </div>
            <div className="weather-details humidity">
              <WaterDropIcon
                className="feels-like-icon"
                fontSize="small"
                sx={{ color: "#fff", opacity: "0.8" }}
              />
              <p className="p-feels-like fs-6 fw-normal opacity-75 text-white">
                Humidity:
              </p>
              <p className="fs-4 text-white">{data.main.humidity}%</p>
            </div>
            <div className="weather-details sunset-sunrise">
              <SunsetSunrise sys={data.sys} />
            </div>
            <div className="weather-details wind">
              <AirIcon
                className="feels-like-icon"
                fontSize="small"
                sx={{ color: "#fff", opacity: "0.8" }}
              />
              <p className="p-feels-like fs-6 fw-normal opacity-75 text-white">
                Wind speed:
              </p>
              <p className="fs-4 text-white">{data.wind.speed} m/s</p>
            </div>
          </div>
        </div>
              </div>
          </div>
        </div>
      </div>
  )
}

export default CurrentWeather