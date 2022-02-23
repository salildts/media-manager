import React, { FC, useState } from 'react';
import { CModal } from '@coreui/react';
import { NavBar, Footer, Body } from './views';
import { ManagerContext } from '../context';
import { ModalRoute, ParentContext, Media } from '../types';
import styled from 'styled-components';

export const MediaManager: FC<ParentContext> = props => {
  const [fullscreen, setFullscreen] = useState(false);

  // RouterState
  const [routeId, setRouteId] = useState<ModalRoute>('library');

  // Media Selection
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);

  return (
    <ManagerContext.Provider
      value={{
        modalContext: {
          fullscreen,
          setFullscreen,
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
      }}
    >
      <Modal
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
