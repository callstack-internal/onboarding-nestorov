import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import 'react-native';
import fetch from 'isomorphic-fetch';
import React from 'react';
import Cities from './Cities';
import {WeatherContextProvider} from './WeatherContext';

beforeEach(() => {
  globalThis.fetch = fetch;
});

it('to call navigate on tap', async () => {
  const navigate = jest.fn();

  render(
    <WeatherContextProvider>
      <Cities navigation={{navigate} as any} route={{} as any} />
    </WeatherContextProvider>,
  );

  await waitFor(
    () => {
      expect(screen.getByText('Paris')).toBeOnTheScreen();
    },
    {timeout: 5000},
  );
  const paris = screen.getByText('Paris');

  fireEvent.press(paris);

  expect(navigate).toHaveBeenCalledWith('City', {id: 2988507, name: 'Paris'});
});
