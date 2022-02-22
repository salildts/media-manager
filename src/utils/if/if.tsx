import { ReactElement } from 'react';

export interface IfProps {
  condition: boolean;
  children: ReactElement;
}

export const If = (props: IfProps): ReactElement | null => {
  const { condition, children } = props;
  if (!!condition && !!children) {
    return children;
  }

  return null;
};
