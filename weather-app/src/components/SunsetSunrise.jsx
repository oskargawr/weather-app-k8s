import React from "react";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./sunsetSunrise.css";

function SunsetSunrise({ sys }) {
  const { sunrise, sunset } = sys;
  const options = { hour: "2-digit", minute: "2-digit" };

  return (
    <div className="w-100">
      <div className="sunset-sunrise-container">
        <div className="sunset-sunrise-container-side text-white">
          <WbTwilightIcon className="fs-1" />
          <p className="fs-3">Sunrise</p>
          <p className="opacity-75">
            {new Date(sunrise * 1000).toLocaleTimeString(undefined, options)}
          </p>
        </div>
        <div className="sunset-sunrise-container-side text-white">
          <DarkModeIcon className="fs-1" />
          <p className="fs-3">Sunset</p>
          <p className="opacity-75">
            {new Date(sunset * 1000).toLocaleTimeString(undefined, options)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SunsetSunrise;
