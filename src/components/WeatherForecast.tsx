import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner, Alert } from 'react-bootstrap';
import ForecastTable from './ForecastTable';
import WeeklySummaryCard from './WeeklySummaryCard';
import DarkModeToggle from './DarkModeToggle';
import LocationControls from './LocationControls';
import LocationMap from './LocationMap';


interface DailyInformationDto {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  generatedEnergy: number;
}

interface WeeklySummaryDto {
  averageWeekPressure: number;
  averageWeekSunExposureHours: number;
  minWeekTemperature: number;
  maxWeekTemperature: number;
  generalWeatherSummary: string;
}

const WeatherForecast: React.FC = () => {
  const [forecast, setForecast] = useState<DailyInformationDto[]>([]);
  const [summary, setSummary] = useState<WeeklySummaryDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [manualLocation, setManualLocation] = useState({ lat: '', lng: '' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => {
          setError("Could not get your location. Please enable location services or enter coordinates manually.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please enter coordinates manually.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (location) fetchWeatherData();
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const forecastResponse = await axios.get(`http://localhost:8080/api/predict/forecast?latitude=${location?.latitude}&longitude=${location?.longitude}`);
      const summaryResponse = await axios.get(`http://localhost:8080/api/predict/summary?latitude=${location?.latitude}&longitude=${location?.longitude}`);

      setForecast(forecastResponse.data);
      setSummary(summaryResponse.data);
      setError(null);
    } catch {
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    setLocation({ latitude: lat, longitude: lng });
  };

  const handleManualLocationSubmit = (lat: number, lng: number) => {
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      setLocation({ latitude: lat, longitude: lng });
    } else {
      setError("Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180)");
    }
  };

  if (loading && !error) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading weather data...</p>
      </Container>
    );
  }

  return (
    <Container className={`mt-4 mb-5 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">7-Day Solar Energy Forecast</h2>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      {error && (
        <Alert variant="danger">
          {error}
          <LocationControls
            manualLocation={manualLocation}
            setManualLocation={setManualLocation}
            onSubmit={handleManualLocationSubmit}
          />
        </Alert>
      )}

      {location && (
        <p className="text-center mb-4">
          Showing forecast for: Latitude {location.latitude.toFixed(4)}, Longitude {location.longitude.toFixed(4)}
        </p>
      )}

      <ForecastTable forecast={forecast} darkMode={darkMode} />
      {summary && <WeeklySummaryCard summary={summary} />}
      {location && (
        <div className="mt-4">
          <LocationMap
            onLocationSelect={handleMapLocationSelect}
            initialPosition={[location.latitude, location.longitude]}
          />
        </div>
      )}
    </Container>
  );
};

export default WeatherForecast;