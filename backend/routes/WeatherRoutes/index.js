import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const apiKey = process.env.OPEN_WEATHER_KEY;

const axiosInstance = axios.create({
  timeout: 5000, // Set a timeout of 5 seconds for all requests
});

// Function to fetch current weather data
async function fetchCurrentWeather(location) {
  try {
    const response = await axiosInstance.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    const { main, weather } = response.data;
    return {
      temperature: main.temp,
      description: weather[0].description,
      icon: weather[0].icon,
      name: location, // Add location name to data
    };
  } catch (error) {
    throw new Error(`Error fetching current weather for ${location}: ${error.message}`);
  }
}

// Route to fetch current weather for a location
router.get("/current/:location", async (req, res) => {
  const { location } = req.params;

  try {
    const currentWeather = await fetchCurrentWeather(location);
    res.status(200).json(currentWeather);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Function to fetch historical weather data
async function fetchHistoricalWeather(location, fromDate, toDate) {
  try {
    // Simulating historical data for demonstration
    // Replace with actual API call to fetch historical weather data
    const historicalData = [
      { date: "2023-05-01", temperature: 25, description: "Sunny", icon: "01d" },
      { date: "2023-05-02", temperature: 22, description: "Cloudy", icon: "02d" },
      { date: "2023-05-03", temperature: 20, description: "Partly cloudy", icon: "03d" },
    ];

    // Filter data within the date range
    const filteredData = historicalData.filter(entry => {
      const currentDate = new Date(entry.date);
      return currentDate >= fromDate && currentDate <= toDate;
    });

    // Format data to match response format
    const formattedData = filteredData.map(entry => ({
      date: entry.date,
      temperature: entry.temperature,
      description: entry.description,
      icon: entry.icon,
    }));

    return formattedData;
  } catch (error) {
    throw new Error("Error fetching historical weather data");
  }
}

// Route to fetch historical weather data for a location and date range
router.get("/historical", async (req, res) => {
  const { location, from, to } = req.query;

  // Validate date range (max 30 days)
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const dateDiff = Math.abs(toDate - fromDate) / (1000 * 60 * 60 * 24);

  if (dateDiff > 30) {
    return res.status(400).json({ message: "Date range should not exceed 30 days" });
  }

  try {
    const historicalWeather = await fetchHistoricalWeather(location, fromDate, toDate);
    res.status(200).json(historicalWeather);
  } catch (error) {
    console.error("Error fetching historical weather data:", error.message);
    res.status(500).json({ message: "Error fetching historical weather data" });
  }
});

export default router;
