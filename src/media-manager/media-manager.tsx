import React, { FC, useContext } from 'react';
import {
  CModal,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
} from '@coreui/react';
import { NavBar } from './components';
import { ManagerContext } from '../manager-context';
import CIcon from '@coreui/icons-react';
import { cilFullscreen, cilX } from '@coreui/icons';

export interface MediaManagerProps {}

export const MediaManager: FC<MediaManagerProps> = ({}) => {
  const { fullscreen } = useContext(ManagerContext);

  return (
    <ManagerContext.Provider value={{ fullscreen: false }}>
      <CModal visible={true} fullscreen={fullscreen} size="lg">
        <NavBar />
        <CModalBody>BODY</CModalBody>
        <CModalFooter className="d-flex justify-content-between">
          <CForm className="d-flex">
            <CFormInput type="search" className="me-2" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
          <div>
            <CButton color="light" size="sm">
              <CIcon icon={cilFullscreen} size="sm" />
            </CButton>
            <CButton color="danger" size="sm">
              <CIcon icon={cilX} />
            </CButton>
          </div>
        </CModalFooter>
      </CModal>
    </ManagerContext.Provider>
  );
};
