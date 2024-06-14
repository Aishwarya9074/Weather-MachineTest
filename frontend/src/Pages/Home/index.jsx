import "./home.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';

import "./home.css"; // Updated CSS file for fantastic styling
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCity, setSelectedCity] = useState('Delhi'); // Default selected city
  const [error, setError] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/weather/current/${selectedCity}`);
        const data = response.data;
        setWeatherData(data);
        console.log(response.data)
        setError('');
      } catch (error) {
        setError(`Error fetching weather data for ${selectedCity}`);
        setWeatherData({});
      }
    };

    fetchWeatherData();
  }, [selectedCity]); // Fetch weather data whenever selectedCity changes

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  const navigateHis=()=>{
    navigate('/weather/historical')

  }

  return (
    <div className="main-weather">
        <div className="weather-dashboard">
      <div className="left-panel">
        <div className="city-select">
          <label htmlFor="citySelect">Select a city:</label>
          <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
            <option value="Delhi">Delhi</option>
            <option value="Moscow">Moscow</option>
            <option value="Paris">Paris</option>
            <option value="New York">New York</option>
            <option value="Sydney">Sydney</option>
            <option value="Riyadh">Riyadh</option>
          </select>
       
        </div>
    
        <Button className="btn" onClick={navigateHis}>History</Button> 

    
        {error && <p className="error-message">{error}</p>}
        
        {/* Today Card */}
        {weatherData.temperature && (
          <div className="weather-card today-card">
            <div className="today-info">
              <h2>Today</h2>
              <br/>
              <div className="current-weather">
                <br/>
                <br/>
                <img className='cli' src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather Icon" />
                <div>
                  <span className="temperature">{weatherData.temperature}°</span>
                  <span className="description">{weatherData.description}</span>
                  <span className="location">{selectedCity}</span>
                  <br/>
                  <span className="date">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="additional-info">
                <h2>Feels {weatherData.feels_like}°</h2>
               
                <span>Sunset: {weatherData.sunset}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="right-panel">
        {/* Hourly Forecast Card */}
        {weatherData.temperature && (
          <div className="weather-card">
            <h3>Hourly Forecast</h3>
            <div className="hourly-forecast">
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />Now <span>25°</span>
              </div>
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />
                2 AM <span>25°</span></div>
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />3 AM <span>23°</span></div>
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />4 AM <span>22°</span></div>
              <div>   <img src="/public/new.png" alt="Cloud Icon" />
                5 AM <span>20°</span></div>
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />
                6 AM <span>25°</span></div>
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />7 AM <span>28°</span></div>
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />8 AM <span>23°</span></div>
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />
                9 AM <span>22°</span></div>
              <div>
              <img src="/public/new.png" alt="Cloud Icon" />10 AM <span>20°</span></div>
            </div>
          </div>
        )}

        {/* Random Text Card */}
        <div className="weather-card random-text">
          <h3>Random Text</h3>
          <p>Improve him believe opinion offered met and end cheered forbade. Friendly as stronger speedily by recurred. Son interest wandered sir addition end say. Manners beloved affixed picture men ask.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
