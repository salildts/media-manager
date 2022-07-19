import React, { useContext } from 'react';
import {
  CForm,
  CContainer,
  CButton,
  CRow,
  CCol,
  CAlert,
  CAlertHeading,
  CBadge,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilFile } from '@coreui/icons';
import { MediaUploadFormInput } from '../../types';
import { ManagerContext } from '../../context';
import { MediaCard } from './components';

export const Upload = () => {
  const {
    parentContext: { acceptFileTypes, validUploadMimeTypes },
    uploadContext: { form },
  } = useContext(ManagerContext);

  const createMediaUploadFormInput = (files: FileList | null) => {
    const mediaUploadFormInput: MediaUploadFormInput = { media: [] };

    if (files) {
      const fileKeys = Object.keys(files ?? {});
      for (const key of fileKeys) {
        mediaUploadFormInput.media.push({
          file: files[(key as unknown) as number],
          title: files[(key as unknown) as number].name,
        });
      }
    }

    return mediaUploadFormInput;
  };

  const isValidMimetypes = (mimetypes: string[]) => {
    if (validUploadMimeTypes) {
      for (const m of mimetypes) {
        if (!validUploadMimeTypes?.includes(m)) {
          return false;
        }
      }
      return true;
    } else {
      return true;
    }
  };

  return (
    <CForm
      className="d-flex flex-column h-100 w-100"
      onSubmit={form?.handleSubmit}
    >
      <CContainer className="d-flex flex-column w-100">
        <CContainer className="w-100">
          <CAlert color="secondary">
            <CAlertHeading>Upload Files</CAlertHeading>
            <CRow>
              <CCol>Select and name the files you would like to upload.</CCol>
              <CCol>
                <CButton
                  color="primary"
                  className="w-100"
                  onClick={() =>
                    document.getElementById('media_input')?.click()
                  }
                >
                  <CIcon icon={cilFile} /> Select Files
                </CButton>
              </CCol>
            </CRow>
          </CAlert>
          <input
            type="file"
            multiple
            className="custom-file-input"
            style={{ height: 0, position: 'absolute' }}
            id="media_input"
            accept={acceptFileTypes}
            onChange={e => {
              const mediaUploadFormInput = createMediaUploadFormInput(
                e.target.files
              );
              form?.setFieldValue('media', mediaUploadFormInput.media);
            }}
          />
          {form?.values.media.length ? (
            <>
              <CRow
                lg={{
                  gutter: 4,
                  cols:
                    form.values.media.length < 3 ? form.values.media.length : 3,
                }}
                xs={{ gutter: 4, cols: 1 }}
              >
                {form.values.media.map((m, idx) => (
                  <CCol key={`${m.file.name}-${idx}`}>
                    <MediaCard
                      media={m}
                      idx={idx}
                      form={form}
                      handleRemove={() =>
                        form.setFieldValue(
                          'media',
                          form.values.media.filter((_, index) => idx !== index)
                        )
                      }
                      isValidMimetype={isValidMimetypes([m.file.type])}
                    />
                  </CCol>
                ))}
              </CRow>
            </>
          ) : (
            <>
              <CAlert
                color="warning"
                className="d-flex justify-content-center align-items-center"
              >
                <CAlertHeading className="mb-0">
                  No Files Selected
                </CAlertHeading>
              </CAlert>
              <CAlert color="info d-flex flex-column justify-content-center align-items-center">
                <CAlertHeading>Valid File Types</CAlertHeading>
                <CContainer className="w-100 d-flex justify-content-center">
                  {acceptFileTypes?.split(' ').map(t => (
                    <CBadge color="info" className="mx-1" key={t}>
                      {t}
                    </CBadge>
                  ))}
                </CContainer>
              </CAlert>
            </>
          )}
        </CContainer>
      </CContainer>
    </CForm>
  );
};
