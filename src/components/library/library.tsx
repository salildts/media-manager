import React, { useContext } from 'react';
import { ManagerContext } from '../../context';
import { MediaCard, MediaCardLoading } from './media-card';
import { CContainer, CCol, CRow, CButton } from '@coreui/react';

export const Library = () => {
  const {
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
    <CContainer>
      <CRow className="my-2">
        {media.map(m => (
          <CCol lg={3} key={m._id}>
            <MediaCard media={m} />
          </CCol>
        ))}
      </CRow>
      {hasMore && (
        <CButton
          className="w-100"
          size="sm"
          color="primary"
          disabled={!hasMore}
          onClick={() => hasMore && onRequestMore && onRequestMore()}
        >
          More
        </CButton>
      )}
    </CContainer>
  );
};
