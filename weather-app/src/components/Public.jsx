import React, { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import CurrentWeather from './CurrentWeather';
import {jwtDecode} from 'jwt-decode';

const Public = ({ token }) => {
  const [search, setSearch] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const decodedToken = jwtDecode(token);
  const { email } = decodedToken;


  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      email: email
    }
  };

  const handleOnSearchChange = (searchData) => {
    setSearch(searchData);
  };

  const fetchData = async () => {
    if (search) {
      try {
        console.log("search: ", search);
        const response = await axios.get(
          `/api/weather?lat=${search.lat}&lon=${search.lon}`, config
        );

        setWeatherData((prevData) => ({
        ...prevData,
        city: search.city,
        airPollution: response.data.airPollution,
        ...response.data.weather,
      }));

        console.log("weatherData: ", weatherData);

        console.log("data: ", response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    if (search !== null) {
    fetchData();
  }
  }, [search]);

  return (
    <div>
      <div className="d-flex justify-content-center pt-4">
        <Search onSearchChange={handleOnSearchChange} token={token} />
      </div>
      {weatherData && (
        <div>
          { weatherData !== null && (
            <CurrentWeather data={weatherData} />
          )}
        </div>
      )}
    </div>
  );
};

export default Public;
