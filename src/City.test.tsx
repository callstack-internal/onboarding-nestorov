import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';
import React, {useEffect} from 'react';
import {useWeatherContext, WeatherContextProvider} from './WeatherContext';
import City from './City';

function FetchWeather() {
  const {loadWeather, weather} = useWeatherContext();
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);
  return weather ? <Text>Weather loaded</Text> : null;
}

beforeEach(() => {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          cnt: 8,
          list: [
            {
              coord: {lon: 17.0333, lat: 51.1},
              sys: {
                country: 'PL',
                timezone: 3600,
                sunrise: 1673333562,
                sunset: 1673363117,
              },
              weather: [
                {
                  id: 803,
                  main: 'Clouds',
                  description: 'broken clouds',
                  icon: '04d',
                },
              ],
              main: {
                temp: 6.19,
                feels_like: 2.76,
                temp_min: 5.51,
                temp_max: 6.9,
                pressure: 1021,
                humidity: 87,
              },
              visibility: 10000,
              wind: {speed: 5.14, deg: 300},
              clouds: {all: 75},
              dt: 1673359759,
              id: 3081368,
              name: 'Wroclaw',
            },
          ],
        }),
    }),
  ) as any;
});

it('to display humidity', async () => {
  const {rerender} = render(
    <WeatherContextProvider>
      <FetchWeather />
    </WeatherContextProvider>,
  );

  await screen.findByText('Weather loaded');

  rerender(
    <WeatherContextProvider>
      <City navigation={null as any} route={{params: {id: 3081368}} as any} />
    </WeatherContextProvider>,
  );

  expect(screen.getByText('Humidity: 87%')).toBeOnTheScreen();
});
