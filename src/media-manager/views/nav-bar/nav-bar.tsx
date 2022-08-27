import React, { useState, useContext } from 'react';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModalHeader,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import { ManagerContext } from '../../../context';

export const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const {
    routerContext: { setRouteId, routeId },
    modalContext: { setFullscreen, fullscreen, listView, setListView },
  } = useContext(ManagerContext);

  return (
    <CModalHeader>
      <CNavbar expand="lg" colorScheme={'light'}>
        <CContainer fluid>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            className="me-2"
            onClick={() => setVisible(!visible)}
          >
            <CIcon icon={cilMenu} />
          </CNavbarToggler>
          <CNavbarBrand className="d-none d-lg-block">
            Media Manager
          </CNavbarBrand>
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink
                  onClick={() => {
                    setRouteId('library');
                    setVisible(false);
                  }}
                  style={{ cursor: 'pointer' }}
                  active={routeId === 'library'}
                >
                  Library
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  onClick={() => {
                    setVisible(false);
                    setRouteId('upload');
                  }}
                  style={{ cursor: 'pointer' }}
                  active={routeId === 'upload'}
                >
                  Upload
                </CNavLink>
              </CNavItem>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle>Settings</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => setFullscreen(!fullscreen)}>
                    {!fullscreen ? 'Full Screen' : 'Pop up'}
                  </CDropdownItem>
                  <CDropdownItem onClick={() => setListView(!listView)}>
                    {listView ? 'Card View' : 'List View'}
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </CModalHeader>
  );
};
