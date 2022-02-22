import React, { useContext } from 'react';
import { CModalFooter, CButton, CTooltip } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilPlus } from '@coreui/icons';
import { ManagerContext } from '../../../context';
import { SearchByName } from '../../../components/search';

export const Footer = () => {
  const {
    parentContext: { onMediaSelect, onMediaDelete },
    mediaSelectionContext: { selectedMedia },
  } = useContext(ManagerContext);

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
          disabled={!selectedMedia.length || !onMediaDelete}
          onClick={() => onMediaDelete && onMediaDelete(selectedMedia)}
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </CTooltip>
      <SearchByName />
      {onMediaSelect ? (
        <CButton
          color="success"
          disabled={!onMediaSelect || !selectedMedia.length}
          onClick={() => onMediaSelect && onMediaSelect(selectedMedia)}
        >
          <CIcon icon={cilPlus} />
        </CButton>
      ) : null}
    </CModalFooter>
  );
};
