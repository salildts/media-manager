export interface Media {
  _id: string;
  title: string;
  path: string;
  mimetype: string;
}

export interface Notification {
  title: string;
  message: string;
}

export interface MediaCardProps {
  media: Media;
}

export interface ManagerContextValues {
  modalContext: ModalContext;
  routerContext: RouterContext;
  parentContext: ParentContext;
  mediaSelectionContext: MediaSelectionContext;
}
export interface ModalContext {
  fullscreen: boolean;
  setFullscreen: (v: boolean) => void;
}

// Routes
export type ModalRoute = 'library' | 'upload';
export interface RouterContext {
  routeId: ModalRoute;
  setRouteId: (v: ModalRoute) => void;
}

// Parent
export interface ParentContext {
  selectLimit?: number;
  visible: boolean;
  setVisible: (v: boolean) => void;
  media: Media[];
  loading: boolean;
  hasMore: boolean;
  onNotification: (notification: Notification) => void;
  onMediaSelect?: (media: Media[]) => void;
  onMediaDelete?: (media: Media[]) => void;
  onRequestMore?: () => void;
  onHandleSearch?: (query: string) => void;
  onUpload?: (upload: MediaUploadProperties) => void;
  validUploadMimeTypes: string[];
  acceptFileTypes?: string;
}

// Media Selection
export interface MediaSelectionContext {
  setSelectedMedia: React.Dispatch<React.SetStateAction<Media[]>>;
  selectedMedia: Media[];
}

export interface MediaUploadProperties {
  file: File;
  title: string;
}
