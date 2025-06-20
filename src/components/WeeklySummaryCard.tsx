import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

interface WeeklySummaryDto {
  averageWeekPressure: number;
  averageWeekSunExposureHours: number;
  minWeekTemperature: number;
  maxWeekTemperature: number;
  generalWeatherSummary: string;
}

const WeeklySummaryCard: React.FC<{ summary: WeeklySummaryDto }> = ({ summary }) => (
  <Card className="mt-4">
    <Card.Header as="h5">Weekly Summary</Card.Header>
    <Card.Body>
      <Row>
        <Col md={3} className="text-center mb-3 mb-md-0">
          <div>Min Temperature</div>
          <h4>{summary.minWeekTemperature}°C</h4>
        </Col>
        <Col md={3} className="text-center mb-3 mb-md-0">
          <div>Max Temperature</div>
          <h4>{summary.maxWeekTemperature}°C</h4>
        </Col>
        <Col md={3} className="text-center mb-3 mb-md-0">
          <div>Avg Pressure</div>
          <h4>{summary.averageWeekPressure.toFixed(2)} hPa</h4>
        </Col>
        <Col md={3} className="text-center">
          <div>Avg Sun Exposure</div>
          <h4>{summary.averageWeekSunExposureHours.toFixed(2)} hours</h4>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <div className="lead">
            <strong>General Weather:</strong> {summary.generalWeatherSummary}
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default WeeklySummaryCard;
