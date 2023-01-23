export const API_BASE_URL =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:3000'
    : 'https://api.openweathermap.org/data/2.5';
export const API_WEATHER_PATH = '/group';
export const API_KEY = '16ab44ea4ef26eb94d83359c02208868';
export const ICON_CDN_BASE_URL = 'https://openweathermap.org/img/wn/';
export const CITIES_LIST = [
  2988507, // Paris,
  3117735, // Madrid,
  5368361, // Los Angeles,
  4930956, // Boston
  5128581, // New York City,
  1880252, // Singapore
  3094802, // Cracow,
  3081368, // Wroclaw,
];

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  blue: 'rgb(160, 193, 216)',
  red: 'rgb(206, 59, 43)',
};
