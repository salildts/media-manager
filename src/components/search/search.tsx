import React, { useContext } from 'react';
import { CFormInput } from '@coreui/react';
import { ManagerContext } from '../../context';

export const SearchByName = () => {
  const {
    parentContext: { onHandleSearch, searchValue },
  } = useContext(ManagerContext);

  return (
    <CFormInput
      type="search"
      size="sm"
      onChange={e => onHandleSearch && onHandleSearch(e.currentTarget.value)}
      placeholder="Search"
      name="name"
      className="w-50"
      value={searchValue}
    />
  );
};
