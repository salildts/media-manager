import React, { FC } from 'react';
import { CContainer, CImage } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilImageBroken } from '@coreui/icons';
import { MediaUploadFormInput } from '../../../types';

export const MediaPreview: FC<{
  file: MediaUploadFormInput['media'][0]['file'];
  isValidMimetype: boolean;
  isDeleteMode: boolean;
}> = ({ file, isValidMimetype, isDeleteMode }) => {
  if (isValidMimetype) {
    switch (file.type) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/jpg':
        return (
          <CImage
            src={URL.createObjectURL(file)}
            className="my-2 w-100 rounded"
            style={{ opacity: !isDeleteMode ? 1 : 0.5 }}
          />
        );

      case 'application/pdf':
        return (
          <embed
            className="my-2 rounded border"
            src={URL.createObjectURL(file)}
            type={'application/pdf'}
            width={'100%'}
            height={'375px'}
            style={{ opacity: !isDeleteMode ? 1 : 0.5 }}
          />
        );

      default: {
        return (
          <CContainer
            className="my-2 p-2 rounded d-flex flex-column justify-content-center align-items-center"
            style={{
              backgroundColor: 'rgba(0,0,0, 0.1)',
              minHeight: '300px',
              opacity: !isDeleteMode ? 1 : 0.5,
            }}
          >
            <CIcon icon={cilImageBroken} size="3xl" />
            <h4>
              <div>Preview Not Available</div>
            </h4>
          </CContainer>
        );
      }
    }
  } else {
    return (
      <CContainer
        className="my-2 p-2 rounded d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: 'rgba(0,0,0, 0.1)',
          minHeight: '300px',
        }}
      >
        <CIcon icon={cilImageBroken} size="3xl" />
        <h4>
          <div>Invalid Upload type</div>
        </h4>
      </CContainer>
    );
  }
};
