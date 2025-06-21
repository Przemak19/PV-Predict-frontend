import {
  faSun, faCloud, faCloudRain, faSnowflake, faBolt, faSmog
} from '@fortawesome/free-solid-svg-icons';

export const getWeatherIcon = (code: number) => {
  if (code >= 0 && code <= 3) return faSun;
  if (code >= 45 && code <= 48) return faSmog;
  if (code >= 51 && code <= 67) return faCloudRain;
  if (code >= 71 && code <= 77) return faSnowflake;
  if (code >= 80 && code <= 86) return faCloudRain;
  if (code >= 95 && code <= 99) return faBolt;
  return faCloud;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getFullYear()}`;
};

export const normalizeLng = (lng: number): number => {
  return ((lng + 180) % 360 + 360) % 360 - 180;
};
