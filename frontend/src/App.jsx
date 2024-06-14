import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/index';
import './App.css';
// import CurrentWeather from './Pages/Currentweather/index'

import HistoricalWeather from './Pages/Historicalweather'; // Corrected path

const App = () => {
  return (
    <div className="main">
      <Routes>
        {/* <Route path="/" element={<CurrentWeather/>} /> */}
        <Route path='/' element={<Home/>}/>
        {/* <Route path="/weather/current/:location" element={<CurrentWeather />} /> */}
        <Route path="/weather/historical" element={<HistoricalWeather />} />
      </Routes>
    </div>
  );
};

export default App;
