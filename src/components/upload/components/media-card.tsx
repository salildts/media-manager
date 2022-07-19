import React, { FC, useState } from 'react';
import {
  CFormInput,
  CCard,
  CCardBody,
  CCardFooter,
  CButton,
} from '@coreui/react';
import { MediaPreview } from './media-preview';
import { FormikProps } from 'formik';
import { MediaUploadFormInput } from '../../../types';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';

export const MediaCard: FC<{
  isValidMimetype: boolean;
  media: { title: string; file: File };
  idx: number;
  handleRemove: () => void;
  form: Pick<
    FormikProps<MediaUploadFormInput>,
    'handleChange' | 'setFieldValue'
  >;
}> = ({ isValidMimetype, media, idx, form, handleRemove }) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  return (
    <CCard
      className="h-100"
      onMouseEnter={() => setIsDeleteMode(true)}
      onMouseLeave={() => setIsDeleteMode(false)}
    >
      <CCardBody className="d-flex justify-content-center align-items-center">
        <MediaPreview
          file={media.file}
          isValidMimetype={isValidMimetype}
          isDeleteMode={isDeleteMode}
        />
        {isDeleteMode && (
          <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
            <CButton size="lg" color="danger" onClick={handleRemove}>
              <CIcon icon={cilX} size={'6xl'} />
            </CButton>
          </div>
        )}
      </CCardBody>
      {isValidMimetype && (
        <CCardFooter>
          <CFormInput
            type="text"
            name={`media[${idx}].title`}
            value={media.title}
            placeholder="File Name"
            onChange={form.handleChange}
          />
        </CCardFooter>
      )}
    </CCard>
  );
};
