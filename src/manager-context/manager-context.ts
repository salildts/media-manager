import { createContext } from 'react';

export interface ManagerContextValues {
  fullscreen: boolean;
}

export const ManagerContext = createContext<ManagerContextValues>({
  fullscreen: false,
});
