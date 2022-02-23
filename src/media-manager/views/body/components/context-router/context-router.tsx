import React, { useContext } from 'react';
import { If } from '../../../../../utils';
import { Library } from '../../../../../components';
import { Upload } from '../../../../../components/upload';
import { ManagerContext } from '../../../../../context';

export const ContextRouter = () => {
  const {
    routerContext: { routeId },
  } = useContext(ManagerContext);

  return (
    <>
      <If condition={routeId === 'upload'}>
        <Upload />
      </If>
      <If condition={routeId === 'library'}>
        <Library />
      </If>
    </>
  );
};
