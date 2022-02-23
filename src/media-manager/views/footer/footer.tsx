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
    },
    mediaSelectionContext: { selectedMedia },
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
          onClick={() => onMediaDelete && onMediaDelete(selectedMedia)}
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </CTooltip>
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
      ) : null}
    </CModalFooter>
  );
};
