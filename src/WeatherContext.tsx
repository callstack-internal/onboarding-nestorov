import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import z from 'zod';
import {
  API_BASE_URL,
  API_KEY,
  API_WEATHER_PATH,
  CITIES_LIST,
} from './constants';

export interface Weather {
  id: number;
  name: string;
  icon: string;
  condition: string;
  temperature: number;
  clouds: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
}

type SomeError = unknown;

interface State {
  error: SomeError | null;
  weather: Weather[] | null;
}

interface Context extends State {
  loadWeather(): void;
}

const context = createContext<Context | null>(null);

export function useWeatherContext() {
  const value = useContext(context);
  if (!value) {
    throw new Error('Weather context not provided');
  }

  return value;
}

export function useWeatherForCity(
  id: number,
): [SomeError | null, Weather | null] {
  const {error, weather} = useWeatherContext();

  if (error || !weather) {
    return [error, null];
  }

  const value = weather.find(item => item.id === id);
  if (!value) {
    throw new Error('Weather for this id has not been requested');
  }

  return [error, value];
}

const responseSchema = z.object({
  list: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      weather: z.array(
        z.object({
          icon: z.string(),
          main: z.string(),
        }),
      ),
      main: z.object({
        temp: z.number(),
        humidity: z.number(),
        pressure: z.number(),
      }),
      wind: z.object({
        speed: z.number(),
        deg: z.number(),
      }),
      clouds: z.object({
        all: z.number(),
      }),
    }),
  ),
});

async function fetchWeatherForAllCities(): Promise<Weather[]> {
  const url = `${API_BASE_URL}${API_WEATHER_PATH}?id=${CITIES_LIST.join()}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = responseSchema.parse(await response.json());
  return data.list.map(
    ({
      id,
      name,
      weather: [{main: condition, icon}],
      main: {temp: temperature, humidity, pressure},
      clouds: {all: clouds},
      wind: {speed: windSpeed},
    }) => ({
      id,
      name,
      icon,
      condition,
      temperature,
      humidity,
      pressure,
      clouds,
      windSpeed,
    }),
  );
}

export function WeatherContextProvider({children}: {children: ReactNode}) {
  const [state, setState] = useState<State>({
    error: null,
    weather: null,
  });

  const hasStartedFetchingRef = useRef(false);
  const loadWeather = useCallback<() => void>(async () => {
    if (hasStartedFetchingRef.current) {
      return;
    }

    hasStartedFetchingRef.current = true;

    try {
      const data = await fetchWeatherForAllCities();
      setState({weather: data, error: null});
    } catch (error) {
      setState({error, weather: null});
    }
  }, []);

  const value = useMemo(() => ({...state, loadWeather}), [state, loadWeather]);
  return <context.Provider value={value}>{children}</context.Provider>;
}

const __testing =
  process.env.NODE_ENV === 'test' ? {fetchWeatherForAllCities} : undefined;

export {__testing};
