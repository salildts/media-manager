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
  CDropdownDivider,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import { ManagerContext } from '../../../context';

export const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const {
    routerContext: { setRouteId, routeId },
    modalContext: { setFullscreen, fullscreen },
  } = useContext(ManagerContext);

  return (
    <CNavbar expand="lg" colorScheme={'light'}>
      <CContainer fluid>
        <CNavbarBrand
          onClick={() => setRouteId('home')}
          style={{ cursor: 'pointer' }}
        >
          Media Manager
        </CNavbarBrand>
        <CNavbarToggler
          aria-label="Toggle navigation"
          aria-expanded={visible}
          onClick={() => setVisible(!visible)}
        >
          <CIcon icon={cilMenu} />
        </CNavbarToggler>
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav>
            <CNavItem>
              <CNavLink
                onClick={() => setRouteId('library')}
                style={{ cursor: 'pointer' }}
                active={routeId === 'library'}
              >
                Library
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => setRouteId('upload')}
                style={{ cursor: 'pointer' }}
                active={routeId === 'upload'}
              >
                Upload
              </CNavLink>
            </CNavItem>
            <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle>Settings</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  onClick={() => setFullscreen(!fullscreen)}
                  active={fullscreen}
                >
                  Full Screen
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">Something else here</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};
