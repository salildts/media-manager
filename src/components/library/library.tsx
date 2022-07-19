import React, { useContext } from 'react';
import { ManagerContext } from '../../context';
import { MediaCard, MediaCardLoading } from './media-card';
import {
  CContainer,
  CCol,
  CRow,
  CButton,
  CAlert,
  CAlertHeading,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell,
} from '@coreui/react';
import { MediaListRow } from './media-list-row';

export const Library = () => {
  const {
    modalContext: { listView },
    parentContext: { media, loading, hasMore, onRequestMore },
    routerContext: { routeId },
  } = useContext(ManagerContext);

  if (loading) {
    return (
      <CContainer>
        <CRow>
          {Array(16).fill(
            <CCol lg={3}>
              <MediaCardLoading />
            </CCol>
          )}
        </CRow>
      </CContainer>
    );
  }

  if (routeId !== 'library') {
    return null;
  }

  return (
    <CContainer className="d-flex flex-column h-100 justify-content-between">
      {listView ? (
        <CTable hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Share</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {media.length ? (
              media.map(m => <MediaListRow media={m} key={m._id} />)
            ) : (
              <CTableRow>
                <CTableDataCell colSpan={5}>
                  <NoMediaFound />
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      ) : (
        <CRow>
          {media.length ? (
            media.map(m => (
              <CCol lg={3} key={m._id}>
                <MediaCard media={m} />
              </CCol>
            ))
          ) : (
            <CCol>
              <NoMediaFound />
            </CCol>
          )}
        </CRow>
      )}
      {hasMore && (
        <CRow>
          <CCol>
            <CButton
              className="w-100"
              color="primary"
              disabled={!hasMore}
              onClick={() => hasMore && onRequestMore && onRequestMore()}
            >
              More
            </CButton>
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
};

const NoMediaFound = () => {
  return (
    <CAlert color="primary">
      <CAlertHeading>No Media</CAlertHeading>Upload media using the upload tab
      in order to add media to your account
    </CAlert>
  );
};
