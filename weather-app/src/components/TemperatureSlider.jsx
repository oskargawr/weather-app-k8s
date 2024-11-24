import React from "react";
import "./CurrentWeather.css";

function TemperatureSlider({ data }) {
  const main = data;

  const toCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
  };

  const minTemp = parseInt(toCelsius(main.temp_min));
  const maxTemp = parseInt(toCelsius(main.temp_max));
  const currentTemp = parseInt(toCelsius(main.temp));

  return (
    <div>
      <div className="temp-container">
        <p className="text-white opacity-75 fw-bold fs- text-center">Min</p>
        <p className="fs-3 text-center text-white">{minTemp}°C</p>
        <p className="text-white opacity-75 fw-bold fs- text-center">Max</p>
        <p className="fs-3 text-center text-white">{maxTemp}°C</p>
      </div>
    </div>
  );
}

export default TemperatureSlider;
