import { createContext } from 'react';

export interface Environment {
  apiUrl: string;
  wsUrl: string;
}

export const EnvironmentContext = createContext<Environment>({
  apiUrl: '',
  wsUrl: ''
});
