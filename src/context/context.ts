import { createContext } from 'react';
import { ManagerContextValues } from '../types';

export const ManagerContext = createContext<ManagerContextValues>({
  modalContext: { fullscreen: false, setFullscreen: () => null },
  routerContext: { routeId: 'home', setRouteId: () => null },
  parentContext: {
    media: [],
    visible: false,
    setVisible: () => null,
    loading: false,
    onNotification: () => null,
    hasMore: false,
  },
  mediaSelectionContext: {
    setSelectedMedia: () => null,
    selectedMedia: [],
  },
});
