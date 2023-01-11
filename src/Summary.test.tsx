import {render, screen} from '@testing-library/react-native';
import React from 'react';
import Summary from './Summary';

it('to display temperature', async () => {
  render(
    <Summary
      item={{
        clouds: 75,
        condition: 'Clouds',
        humidity: 87,
        icon: '04d',
        id: 3081368,
        name: 'Wroclaw',
        pressure: 1021,
        temperature: 6.19,
        windSpeed: 5.14,
      }}
    />,
  );

  expect(screen.getByText('6.19 °C')).toBeOnTheScreen();
});
