import React, { useContext } from 'react';
import { CModalFooter, CButton, CTooltip, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { ManagerContext } from '../../../context';
import { SearchByName } from '../../../components/search';

export const Footer = () => {
  // Hooks
  const {
    parentContext: {
      onMediaSelect,
      onMediaDelete,
      selectLimit = 0,
      setVisible,
      loading,
      onUpload,
    },
    mediaSelectionContext: { selectedMedia, setSelectedMedia },
    routerContext: { routeId },
    uploadContext: { form },
  } = useContext(ManagerContext);

  // Logic

  const handleSubmit = () => {
    if (onMediaSelect) {
      onMediaSelect(selectedMedia);
      setSelectedMedia([]);
      setVisible(false);
    }
  };

  const handleMediaDelete = () => {
    if (onMediaDelete) {
      onMediaDelete(selectedMedia);
      setSelectedMedia([]);
    }
  };

  return (
    <CModalFooter className="d-flex justify-content-between">
      <CTooltip
        content={
          !onMediaDelete
            ? 'Media Delete Disabled'
            : `Delete ${selectedMedia.length} item(s)?`
        }
      >
        <CButton
          color="danger"
          className="mx-2"
          variant={'outline'}
          disabled={!selectedMedia.length || !onMediaDelete}
          onClick={handleMediaDelete}
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </CTooltip>
      <SearchByName />
      {routeId === 'library' ? (
        <>
          <CButton
            color={!onMediaSelect ? 'danger' : 'success'}
            disabled={
              !onMediaSelect ||
              !selectedMedia.length ||
              selectedMedia.length > (selectLimit ?? 0)
            }
            onClick={handleSubmit}
          >
            {selectedMedia.length > selectLimit ? 'Too Many' : 'Select'}
          </CButton>
        </>
      ) : (
        <>
          <CButton
            color={!onUpload ? 'danger' : 'success'}
            disabled={!form?.values.media.length || !onUpload}
            onClick={form?.submitForm}
          >
            {!loading ? 'Upload' : <CSpinner size="sm" />}
          </CButton>
        </>
      )}
    </CModalFooter>
  );
};
