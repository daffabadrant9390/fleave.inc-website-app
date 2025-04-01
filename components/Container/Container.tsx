import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './Container.module.scss';

export type ContainerProps = {
  children?: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={cx(styles.container, className)}>{children}</div>;
};
