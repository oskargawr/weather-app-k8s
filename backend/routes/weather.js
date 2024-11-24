import express from "express";
import axios from "axios";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api.js";

const router = express.Router();

const getWeatherAndAirPollution = async (req, res) => {
  try {
    const { lat, lon, email } = req.query;
    const { redisClient } = req;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    const weatherResponse = await axios.get(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    const airPollutionResponse = await axios.get(
      `${WEATHER_API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    const combinedData = {
      weather: weatherResponse.data,
      airPollution: airPollutionResponse.data.list[0],
    };

    if (email) {
      try {
        const reply = await redisClient.lPush(
          email,
          JSON.stringify({
            city: weatherResponse.data.name,
            timestamp: new Date(),
          })
        );
        console.log(`Redis LPUSH success: ${reply}`);
      } catch (err) {
        console.error(`Redis LPUSH error: ${err.message}`);
      }
    }

    res.json(combinedData);
  } catch (error) {
    console.error(`Weather endpoint error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

router.get("/", getWeatherAndAirPollution);

export default router;
