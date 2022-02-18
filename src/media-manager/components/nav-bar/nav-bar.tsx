import React, { useState } from 'react';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';

export const NavBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <CNavbar expand="lg">
      <CContainer fluid>
        <CNavbarBrand href="#">Media Manager</CNavbarBrand>
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
              <CNavLink href="#" active>
                Library
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Upload</CNavLink>
            </CNavItem>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};
