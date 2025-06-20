import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon, formatDate } from './helpers';

interface DailyInformationDto {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  generatedEnergy: number;
}

const ForecastTable: React.FC<{ forecast: DailyInformationDto[]; darkMode: boolean }> = ({ forecast, darkMode }) => {
  if (forecast.length === 0) return null;

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="table-responsive">
          <Table bordered hover className={darkMode ? 'table-dark' : ''}>
            <thead>
              <tr>
                {forecast.map((day) => (
                  <th key={day.date} className="text-center">
                    {formatDate(day.date)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {forecast.map((day) => (
                  <td key={day.date} className="text-center">
                    <FontAwesomeIcon icon={getWeatherIcon(day.weatherCode)} size="2x" className="mb-2 weather-icon" />
                  </td>
                ))}
              </tr>
              <tr>
                {forecast.map((day) => (
                  <td key={day.date} className="text-center">
                    <div>Max: {day.maxTemperature}°C</div>
                    <div>Min: {day.minTemperature}°C</div>
                  </td>
                ))}
              </tr>
              <tr>
                {forecast.map((day) => (
                  <td key={day.date} className="text-center">
                    <strong>{day.generatedEnergy.toFixed(2)} kWh</strong>
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ForecastTable;
