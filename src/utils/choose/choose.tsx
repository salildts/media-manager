import { ReactNode, FC } from 'react';

export const Choose: FC = props => {
  const { children } = props;

  let toReturn: ReactNode = null;

  if (Array.isArray(children)) {
    for (const c of children) {
      if (c.type.name === 'When' && c.props.condition) {
        return c;
      }
    }
  }

  if (Array.isArray(children)) {
    for (const c of children) {
      if (c.type.name === 'Otherwise') {
        return c;
      }
    }
  }

  return toReturn;
};
