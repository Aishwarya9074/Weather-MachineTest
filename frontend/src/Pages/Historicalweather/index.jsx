import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './history.css'; // Ensure this file exists and is correctly imported

const Historicalweather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const locations = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'];
      try {
        const promises = locations.map(location =>
          axios.get(`http://localhost:8000/weather/current/${location}`)
        );
        const responses = await Promise.all(promises);
        const data = responses.map((response, index) => ({
          ...response.data,
          name: locations[index] // Add location name to data
        }));

        setWeatherData(data);
        setLoading(false);
        setError('');
      } catch (error) {
        setError('Error fetching weather data');
        setWeatherData([]);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const fetchHistoricalData = async (location) => {
    try {
      const response = await axios.get(`http://localhost:8000/weather/historical?location=${location}&from=${fromDate}&to=${toDate}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching historical weather data');
    }
  };

  const handleFetchHistorical = async (location) => {
    if (!fromDate || !toDate) {
      setError('Please select both from and to dates.');
      return;
    }
    try {
      const historicalData = await fetchHistoricalData(location);
      setWeatherData(prevData => {
        const newData = [...prevData];
        const index = newData.findIndex(item => item.name === location);
        if (index !== -1) {
          newData[index].historicalData = historicalData;
        }
        return newData;
      });
    } catch (error) {
      setError('Error fetching historical data');
    }
  };

  return (
    <div className="we-main">
      <div className="weatherr-dashboard">
      <h2>Weather Dashboard</h2>
      <div className="date-picker">
        <label>
          From:
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </label>
        <label>
          To:
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
        </label>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="weather-cards">
          {weatherData.map((weather, index) => (
            <div key={index} className="weather-cardd">
              <h3>{weather.name}</h3>
              <p><strong>Temperature:</strong> {weather.temperature}°C</p>
              <p><strong>Description:</strong> {weather.description}</p>
              <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt="Weather Icon" />
              {weather.historicalData ? (
                <div>
                  <h4>Historical Weather Data</h4>
                  <ul>
                    {weather.historicalData.map(entry => (
                      <li key={entry.date}>
                        <strong>Date:</strong> {entry.date}<br />
                        <strong>Temperature:</strong> {entry.temperature}°C<br />
                        <strong>Description:</strong> {entry.description}<br />
                        <img src={`http://openweathermap.org/img/wn/${entry.icon}.png`} alt="Weather Icon" />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <button onClick={() => handleFetchHistorical(weather.name)}>Fetch Historical Data</button>
              )}
            </div>
          ))}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
};

export default Historicalweather;
