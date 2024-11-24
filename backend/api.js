import dotenv from 'dotenv';
dotenv.config();

export const geoApiOptions = {
  method: "GET",
  url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
  },
};

export const WEATHER_API_URL = process.env.WEATHER_API_URL;
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;