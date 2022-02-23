import React, { useContext } from 'react';
import { CModalFooter, CButton, CTooltip } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilPlus } from '@coreui/icons';
import { ManagerContext } from '../../../context';
import { SearchByName } from '../../../components/search';

export const Footer = () => {
  // Hooks
  const {
    parentContext: {
      onMediaSelect,
      onMediaDelete,
      selectLimit,
      onNotification,
      setVisible,
    },
    mediaSelectionContext: { selectedMedia, setSelectedMedia },
  } = useContext(ManagerContext);

  // Logic

  const handleSubmit = () => {
    if (onMediaSelect) {
      if (selectedMedia.length > (selectLimit ?? 1)) {
        onNotification({
          title: 'Maximum Exceeded',
          message: 'You have selected too many items for this task.',
        });
        return;
      }

      onMediaSelect(selectedMedia);
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
      {onMediaDelete ? (
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
      ) : (
        <div />
      )}
      <SearchByName />
      {onMediaSelect ? (
        <CTooltip
          content={
            selectedMedia.length > (selectLimit ?? 1)
              ? `You may only select ${selectLimit ?? 1} item for this task.`
              : `Choose up to ${selectLimit ?? 1} item(s).`
          }
        >
          <CButton
            color={
              selectedMedia.length > (selectLimit ?? 1) ? 'danger' : 'success'
            }
            variant={
              selectedMedia.length > (selectLimit ?? 1) ? 'outline' : undefined
            }
            disabled={!onMediaSelect || !selectedMedia.length}
            onClick={handleSubmit}
          >
            <CIcon icon={cilPlus} />
          </CButton>
        </CTooltip>
      ) : (
        <div />
      )}
    </CModalFooter>
  );
};
