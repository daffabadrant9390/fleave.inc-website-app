'use client';
import { useDeviceType } from '@/lib/hooks/useDeviceType';
import styles from './Navigation.module.scss';
import { Container } from '../Container/Container';
import Image from 'next/image';
import { NavigationLinks } from './components/NavigationLinks/NavigationLinks';
import { LanguageOptions } from './components/LanguageOptions/LanguageOptions';
import { Button } from '../Button/Button';
import { useRouter } from 'next/navigation';
import { NAVIGATION_DATA } from '@/lib/data/navigation';
import { DesktopNavigationLinks } from './components/NavigationLinks/desktop/DesktopNavigationLinks';
import { MobileNavigationLinks } from './components/NavigationLinks/mobile/MobileNavigationLinks';
import { useEffect, useState } from 'react';

export const Navigation = () => {
  const { isDesktop } = useDeviceType();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Only render after component is mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <Container>
      <section className={styles.navigation_container}>
        <Image
          src={'/assets/fleave-logo-transparent.png'}
          className={styles.image_logo}
          width={170}
          height={32}
          alt="Logo Fleave.inc"
          // unoptimized TODO: Check if this needed in the future
          // loader={} TODO: Provide the loader to enhance UX
          // blurDataURL='' TODO: Provide the blurDataURL to enhance UX
          // placeholder="blur" TODO: Only add this if blurDataURL is provided
          // style={{
          //   transition: '0.3s',
          // }}
        />
        <div className={styles.navigation_right_section}>
          <div className={styles.navigation_links_section}>
            {isDesktop ? (
              <DesktopNavigationLinks navigationLinksData={NAVIGATION_DATA} />
            ) : (
              <MobileNavigationLinks navigationLinksData={NAVIGATION_DATA} />
            )}
          </div>
          <div className={styles.contact_us_language_option}>
            <LanguageOptions />
            {isDesktop && (
              <Button
                onClick={() => router.push('/contact-us')}
                size="regular"
                variant="primary"
              >
                Contact Us
              </Button>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};
