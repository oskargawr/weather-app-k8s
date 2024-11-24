import axios from "axios";
import express from "express";
import { geoApiOptions } from "../api.js";

const router = express.Router();

const getCityList = async (req, res) => {
  const { search } = req.query;
  try {
    geoApiOptions.params = { minPopulation: "0", namePrefix: search };
    const response = await axios.request(geoApiOptions);
    res.json({
      options: response.data.data.map((city) => ({
        value: `${city.latitude}, ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.get("/", getCityList);
export default router;
