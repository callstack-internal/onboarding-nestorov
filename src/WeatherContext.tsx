import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
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

interface State {
  error: unknown | null;
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

interface Response {
  list: {
    id: number;
    name: string;
    weather: [
      {
        icon: string;
        main: string;
      },
    ];
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
  }[];
}

async function fetchWeatherForAllCities(): Promise<Weather[]> {
  const url = `${API_BASE_URL}${API_WEATHER_PATH}?id=${CITIES_LIST.join()}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = (await response.json()) as Response;
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
