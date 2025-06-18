'use client';

import cx from 'classnames';
import styles from './TitleSectionLayout.module.scss';

export type TitleSectionLayoutProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export const TitleSectionLayout = ({
  title,
  subtitle,
  className,
}: TitleSectionLayoutProps) => {
  return (
    <div className={cx(styles.title_section_layout, className)}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};
