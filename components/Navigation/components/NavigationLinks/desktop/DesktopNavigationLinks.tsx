import { NavigationData } from '@/lib/types/navigationType';
import styles from './DesktopNavigationLinks.module.scss';
import Link from 'next/link';
import cx from 'classnames';

export type DesktopNavigationLinksProps = {
  navigationLinksData: NavigationData;
};

export const DesktopNavigationLinks = ({
  navigationLinksData,
}: DesktopNavigationLinksProps) => {
  return (
    <nav className={styles.navigation_container}>
      {navigationLinksData.map((navigationLinksItem) => {
        //TODO: Check the isActive from zustand
        const isActiveLink = navigationLinksItem.key === 'homePage';

        return (
          <Link
            key={`navigation-links-${navigationLinksItem.key}`}
            href={navigationLinksItem.url}
            rel={'alternate'}
            className={cx(
              styles.navigation_link_item,
              isActiveLink && styles.active_link_item
            )}
          >
            {navigationLinksItem.title}
          </Link>
        );
      })}
    </nav>
  );
};
