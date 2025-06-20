import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const LocationControls: React.FC<{
  manualLocation: { lat: string; lng: string };
  setManualLocation: (loc: { lat: string; lng: string }) => void;
  onSubmit: (lat: number, lng: number) => void;
}> = ({ manualLocation, setManualLocation, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(manualLocation.lat);
    const lng = parseFloat(manualLocation.lng);
    onSubmit(lat, lng);
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Row>
        <Col md={5}>
          <Form.Control
            type="number"
            placeholder="Latitude (-90 to 90)"
            value={manualLocation.lat}
            onChange={(e) => setManualLocation({ ...manualLocation, lat: e.target.value })}
            step="any"
            required
          />
        </Col>
        <Col md={5}>
          <Form.Control
            type="number"
            placeholder="Longitude (-180 to 180)"
            value={manualLocation.lng}
            onChange={(e) => setManualLocation({ ...manualLocation, lng: e.target.value })}
            step="any"
            required
          />
        </Col>
        <Col md={2}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LocationControls;
