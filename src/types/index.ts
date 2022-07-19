import { FormikProps } from 'formik';

export interface Media {
  _id: string;
  title: string;
  src: string;
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
  uploadContext: UploadContext;
}
export interface ModalContext {
  fullscreen: boolean;
  setFullscreen: (v: boolean) => void;
  listView: boolean;
  setListView: (v: boolean) => void;
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
  onUpload?: (upload: MediaUploadFormInput) => void;
  validUploadMimeTypes?: string[];
  acceptFileTypes?: string;
  searchValue?: string;
}

// Media Selection
export interface MediaSelectionContext {
  setSelectedMedia: React.Dispatch<React.SetStateAction<Media[]>>;
  selectedMedia: Media[];
}

export interface MediaUploadFormInput {
  media: { file: File; title: string }[];
}

export interface UploadContext {
  form: FormikProps<MediaUploadFormInput> | null;
}
