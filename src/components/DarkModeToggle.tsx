import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle: React.FC<{ darkMode: boolean; setDarkMode: (value: boolean) => void }> = ({ darkMode, setDarkMode }) => (
  <Button 
    variant={darkMode ? 'light' : 'dark'} 
    onClick={() => setDarkMode(!darkMode)}
    className="me-2"
  >
    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} /> {darkMode ? 'Light' : 'Dark'} Mode
  </Button>
);

export default DarkModeToggle;
