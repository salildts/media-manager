import { createContext } from 'react';
import { ManagerContextValues } from '../types';

export const ManagerContext = createContext<ManagerContextValues>({
  modalContext: {
    fullscreen: false,
    setFullscreen: () => null,
    listView: false,
    setListView: () => null,
  },
  routerContext: { routeId: 'library', setRouteId: () => null },
  parentContext: {
    media: [],
    visible: false,
    setVisible: () => null,
    loading: false,
    onNotification: () => null,
    hasMore: false,
    validUploadMimeTypes: [],
  },
  mediaSelectionContext: {
    setSelectedMedia: () => null,
    selectedMedia: [],
  },
  uploadContext: {
    form: null,
  },
});
