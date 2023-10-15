import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment/moment';

//const axios = require('axios');

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [image, setImage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    fetchWeatherInfo();
  }, []);

  const fetchWeatherInfo = (e) => {
    e?.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: inputRef.current.value || 'london, uk' },
      headers: {
        'X-RapidAPI-Key': 'f5640ae5c3msh4cd526b7ac384eap155958jsn9014ce51787d',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log('weatherInfo', weatherInfo);
        setWeatherInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    determineBackgroundImage();
  }, [weatherInfo]);

  const determineBackgroundImage = () => {
    if (weatherInfo?.current.temp_c < 10) {
      setImage(
        'https://plus.unsplash.com/premium_photo-1675276116240-51a71b0a8524?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbGR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
      );
    }

    if (weatherInfo?.current.temp_c > 10) {
      setImage(
        'https://images.unsplash.com/photo-1633888867097-0e60add72f17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGF1dHVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
      );
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${image})` }}>
      <div className="app__container">
        <div className="app__info app__left">
          <h1>Our weather app</h1>
          <form>
            <input ref={inputRef} type="text" placeholder="Type the City" />
            <button onClick={fetchWeatherInfo} type="submit">
              Show me the weather
            </button>
          </form>
        </div>
        <div className="app__info app__right">
          <h2>{weatherInfo?.location.name}</h2>
          <div className="app__weather__temp">
            <h3>{weatherInfo?.current.temp_c} Degrees Celsius</h3>
            <h3>Feels like: {weatherInfo?.current.feelslike_c}</h3>
          </div>

          <div className="app__weather__condition">
            <h3>{weatherInfo?.current.condition.text}</h3>
            <img src={weatherInfo?.current.condition.icon} alt="" />
          </div>

          <h3>
            {weatherInfo &&
              moment
                .unix(weatherInfo?.location?.localtime_epoch)
                .format('LLLL')}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
