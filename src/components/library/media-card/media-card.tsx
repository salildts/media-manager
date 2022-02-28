import React, { useContext } from 'react';
import { CCard, CImage, CPlaceholder, CBadge, CTooltip } from '@coreui/react';
import { FC } from 'react';
import { MediaCardProps, Media } from '../../../types';
import styled from 'styled-components';
import { Choose } from '../../../utils/choose';
import { When } from '../../../utils/when';
import { Otherwise } from '../../../utils/otherwise';
import CIcon from '@coreui/icons-react';
import { cilImageBroken, cilCheck } from '@coreui/icons';
import { ManagerContext } from '../../../context';
import { If } from '../../../utils';

export const MediaCard: FC<MediaCardProps> = ({ media }) => {
  const {
    mediaSelectionContext: { selectedMedia, setSelectedMedia },
  } = useContext(ManagerContext);

  const handleMediaSelection = (newMedia: Media) => {
    if (!selectedMedia.find(m => m._id === newMedia._id)) {
      setSelectedMedia(m => {
        return [...m, newMedia];
      });
    } else {
      setSelectedMedia(m => m.filter(mm => mm._id !== media._id));
    }
  };

  return (
    <Choose>
      <When condition={media.mimetype.includes('image')}>
        <CTooltip content={media.title}>
          <Card
            className="rounded my-2 mx-0"
            onClick={() => handleMediaSelection(media)}
          >
            <If condition={selectedMedia.some(m => m._id === media._id)}>
              <CBadge color="success" position="top-end" shape="rounded">
                <CIcon icon={cilCheck} />
              </CBadge>
            </If>
            <Image src={media.path} className="rounded" />
          </Card>
        </CTooltip>
      </When>
      <When condition={media.mimetype.includes('application/pdf')}>
        <CTooltip content={media.title}>
          <Card
            className="rounded my-2 mx-0"
            onClick={() => handleMediaSelection(media)}
          >
            <If condition={selectedMedia.some(m => m._id === media._id)}>
              <CBadge color="success" position="top-end" shape="rounded">
                <CIcon icon={cilCheck} />
              </CBadge>
            </If>
            <ClickableOverlay />
            <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
              <embed
                src={`${media.path}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0`}
                type={media.mimetype}
                width={'100%'}
                height={'100%'}
              />
            </div>
          </Card>
        </CTooltip>
      </When>
      <Otherwise>
        <CTooltip content={'Unknown Media Type'}>
          <UnknownMedia className="rounded my-2 mx-0">
            <CIcon icon={cilImageBroken} size="xl" />
          </UnknownMedia>
        </CTooltip>
      </Otherwise>
    </Choose>
  );
};

export const MediaCardLoading = () => {
  return (
    <CCard className="m-2" style={{ height: '100px', border: 'none' }}>
      <CPlaceholder
        component={CImage}
        className="rounded"
        style={{ height: '100%' }}
      />
    </CCard>
  );
};

const Card = styled(CCard)`
  height: 100px;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: box-shadow ease 0.5s;
  background-color: black;
  justify-content: center;

  :hover {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 992px) {
    height: 200px;
  }
`;

const Image = styled(CImage)`
  object-fit: cover;
  overflow: hidden;
  background-color: black;

  : hover {
    object-fit: contain;
  }
`;

const ClickableOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const UnknownMedia = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  @media (max-width: 992px) {
    height: 200px;
  }
`;
