import React, { useContext } from 'react';
import {
  CForm,
  CContainer,
  CInputGroup,
  CButton,
  CFormInput,
  CSpinner,
  CFormLabel,
  CImage,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilFile, cilImageBroken } from '@coreui/icons';
import { Formik } from 'formik';
import { MediaUploadProperties } from '../../types';
import { ManagerContext } from '../../context';
import { Choose } from '../../utils/choose';
import { When } from '../../utils/when';
import { Otherwise } from '../../utils/otherwise';

export const Upload = () => {
  const {
    parentContext: { onUpload, loading, validUploadMimeTypes },
  } = useContext(ManagerContext);

  return (
    <Formik<MediaUploadProperties>
      initialValues={{ title: '', file: {} as File }}
      onSubmit={(values, helpers) => {
        onUpload && onUpload(values);
        helpers.setSubmitting(false);
      }}
    >
      {form => (
        <CForm
          className="d-flex flex-column h-100 w-100"
          onSubmit={form.handleSubmit}
        >
          <CContainer className="d-flex flex-column w-100">
            <CContainer className="w-100">
              <CFormLabel>Upload File</CFormLabel>
              <input
                type="file"
                className="custom-file-input"
                style={{ height: 0, position: 'absolute' }}
                id="media_input"
                onChange={e => {
                  form.setFieldValue(
                    'file',
                    (e.target as HTMLInputElement).files![0]
                  );
                  form.setFieldValue(
                    'title',
                    (e.target as HTMLInputElement).files![0].name
                  );
                }}
              />
              <CInputGroup>
                <CButton
                  color="primary"
                  onClick={() =>
                    document.getElementById('media_input')?.click()
                  }
                >
                  <CIcon icon={cilFile} />
                </CButton>
                <CFormInput
                  type="text"
                  name="title"
                  value={form.values.title}
                  onClick={() =>
                    !form.values.file?.name &&
                    document.getElementById('media_input')?.click()
                  }
                  placeholder="Choose a file to upload."
                  onChange={form.handleChange}
                />
                <CButton
                  color="success"
                  type="submit"
                  disabled={
                    !form.values.file?.name ||
                    loading ||
                    (validUploadMimeTypes &&
                      !validUploadMimeTypes.includes(form.values.file.type))
                  }
                >
                  {loading ? <CSpinner size="sm" /> : 'Upload'}
                </CButton>
              </CInputGroup>
              {form.values.file.name ? (
                <Choose>
                  <When
                    condition={
                      form.values.file.type.includes('image') &&
                      (validUploadMimeTypes?.includes(form.values.file.type) ??
                        true)
                    }
                  >
                    <CImage
                      src={URL.createObjectURL(form.values.file)}
                      className="my-2 w-100 rounded"
                    />
                  </When>
                  <When
                    condition={
                      form.values.file.type === 'application/pdf' &&
                      (validUploadMimeTypes?.includes('application/pdf') ??
                        true)
                    }
                  >
                    <embed
                      className="my-2 rounded border"
                      src={`${URL.createObjectURL(
                        form.values.file
                      )}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0`}
                      type={'application/pdf'}
                      width={'100%'}
                      height={'375px'}
                    />
                  </When>
                  <Otherwise>
                    <CContainer
                      className="my-2 p-2 rounded d-flex flex-column justify-content-center align-items-center"
                      style={{
                        backgroundColor: 'rgba(0,0,0, 0.1)',
                        minHeight: '300px',
                      }}
                    >
                      <CIcon icon={cilImageBroken} size="3xl" />
                      <h4>
                        <Choose>
                          <When condition={!validUploadMimeTypes}>
                            <div>Preview Not Available</div>
                          </When>
                          <Otherwise>
                            <div>Invalid Upload type</div>
                          </Otherwise>
                        </Choose>
                      </h4>
                    </CContainer>
                  </Otherwise>
                </Choose>
              ) : (
                <CContainer
                  className="my-2 p-2 rounded d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: 'rgba(0,0,0, 0.1)',
                    minHeight: '300px',
                  }}
                >
                  <CIcon icon={cilFile} size="3xl" />
                </CContainer>
              )}
            </CContainer>
          </CContainer>
        </CForm>
      )}
    </Formik>
  );
};
