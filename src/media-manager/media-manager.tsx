import React, { FC, useState, useEffect } from 'react';
import { CModal } from '@coreui/react';
import { NavBar, Footer, Body } from './views';
import { ManagerContext } from '../context';
import {
  ModalRoute,
  ParentContext,
  Media,
  MediaUploadFormInput,
} from '../types';
import styled from 'styled-components';
import { useFormik } from 'formik';

export const MediaManager: FC<ParentContext> = props => {
  const [fullscreen, setFullscreen] = useState(false);
  const [listView, setListView] = useState(false);

  // RouterState
  const [routeId, setRouteId] = useState<ModalRoute>('library');

  // Media Selection
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);

  const isValidMimetypes = (mimetypes: string[]) => {
    if (props.validUploadMimeTypes) {
      for (const m of mimetypes) {
        if (!props.validUploadMimeTypes?.includes(m)) {
          return false;
        }
      }
      return true;
    } else {
      return true;
    }
  };

  const form = useFormik<MediaUploadFormInput>({
    initialValues: { media: [] },
    onSubmit: (values, helpers) => {
      if (!isValidMimetypes(values.media.map(m => m.file.type))) {
        props.onNotification({
          title: 'Invalid upload type.',
          message: 'Please remove the invalid file type.',
        });
        return;
      }
      props.onUpload && props.onUpload(values);
      helpers.setSubmitting(false);
      setRouteId('library');
      helpers.resetForm();
    },
  });

  useEffect(() => {
    console.log('--------------- Media manager ----------------')
  }, [])

  return (
    <ManagerContext.Provider
      value={{
        modalContext: {
          fullscreen,
          setFullscreen,
          listView,
          setListView,
        },
        routerContext: {
          routeId,
          setRouteId,
        },
        parentContext: {
          ...props,
        },
        mediaSelectionContext: {
          selectedMedia,
          setSelectedMedia,
        },
        uploadContext: {
          form,
        },
      }}
    >
      <Modal
        backdrop={props.backdrop || true}
        visible={props.visible}
        fullscreen={fullscreen}
        size="lg"
        scrollable
        onClose={() => props.setVisible(false)}
      >
        <NavBar />
        <Body />
        <Footer />
      </Modal>
    </ManagerContext.Provider>
  );
};

const Modal = styled(CModal)`
  .modal-content {
    min-height: 92vh;
  }
`;
