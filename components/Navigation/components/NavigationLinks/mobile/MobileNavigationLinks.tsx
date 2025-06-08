import { NavigationData } from '@/lib/types/navigationType';
import styles from './MobileNavigationLinks.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { NAVIGATION_DATA } from '@/lib/data/navigation';
import Link from 'next/link';

export type MobileNavigationLinksProps = {
  navigationLinksData: NavigationData;
};

export const MobileNavigationLinks = ({
  navigationLinksData,
}: MobileNavigationLinksProps) => {
  const [isOpenNavigationMenu, setIsOpenNavigationMenu] = useState(false);

  return (
    <>
      <div
        className={styles.hamburger_menu_icon_wrapper}
        onClick={() => setIsOpenNavigationMenu(true)}
      >
        <Image
          alt="Hamburger Menu Mobile"
          fill
          style={{
            width: '100%',
            height: '100%',
          }}
          src="/assets/mobile-menu-nav.png"
        />
      </div>

      <div
        className={cx(
          styles.mobile_navigation_overlay_container,
          isOpenNavigationMenu && styles.is_open_overlay
        )}
      >
        <div className={styles.header}>
          <div
            className={styles.close_button_wrapper}
            onClick={() => setIsOpenNavigationMenu(false)}
          >
            <Image
              alt="Close Button Navigation Overlay"
              fill
              style={{
                width: '100%',
                height: '100%',
              }}
              src="/assets/close-button-nav-mobile-invert.png"
            />
          </div>
        </div>
        <div className={styles.navigation_links_container}>
          {NAVIGATION_DATA.map((navigationLinksItem) => {
            const isActiveLink = navigationLinksItem.key === 'homePage'; //TODO: Get from zustand

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
          <button type="button" className={styles.contact_us_btn}>
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
};
