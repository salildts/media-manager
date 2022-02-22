import React, { FC, ReactElement } from 'react';

interface WhenProps {
  condition: boolean;
  children: ReactElement;
}

export const When: FC<WhenProps> = ({ children }) => {
  return <>{children}</>;
};
