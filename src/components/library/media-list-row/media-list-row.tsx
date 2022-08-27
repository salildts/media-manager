import React, { FC, useContext } from 'react';
import {
  CTableRow,
  CTableDataCell,
  CButton,
  CLink,
  CPopover,
} from '@coreui/react';
import { Media } from '../../../types';
import CIcon from '@coreui/icons-react';
import { cilShare } from '@coreui/icons';
import { ManagerContext } from '../../../context';
import { MediaCard } from '../media-card';

interface MediaListRowProps {
  media: Media;
}

export const MediaListRow: FC<MediaListRowProps> = ({ media }) => {
  const {
    mediaSelectionContext: { selectedMedia, setSelectedMedia },
  } = useContext(ManagerContext);

  const handleRowSelection = (newMedia: Media) => {
    if (!selectedMedia.find(m => m._id === newMedia._id)) {
      setSelectedMedia(m => {
        return [...m, newMedia];
      });
    } else {
      setSelectedMedia(m => m.filter(mm => mm._id !== media._id));
    }
  };

  return (
    <CPopover content={<MediaCard media={media} />} trigger="hover">
      <CTableRow
        onClick={() => handleRowSelection(media)}
        active={!!selectedMedia.find(m => m._id === media._id)}
        role="button"
      >
        <CTableDataCell>{media.title}</CTableDataCell>
        <CTableDataCell>{media._id}</CTableDataCell>
        <CTableDataCell>{media.mimetype}</CTableDataCell>
        <CTableDataCell>
          <CLink target="_blank" href={media.src}>
            <CButton>
              <CIcon icon={cilShare} />
            </CButton>
          </CLink>
        </CTableDataCell>
      </CTableRow>
    </CPopover>
  );
};
