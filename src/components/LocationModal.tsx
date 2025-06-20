import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import LocationMap from './LocationMap';

const LocationModal: React.FC<{
  show: boolean;
  onHide: () => void;
  location: { latitude: number; longitude: number } | null;
  onSelect: (lat: number, lng: number) => void;
}> = ({ show, onHide, location, onSelect }) => (
  <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Select Location</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {location && (
        <LocationMap
          onLocationSelect={onSelect}
          initialPosition={[location.latitude, location.longitude]}
        />
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default LocationModal;
