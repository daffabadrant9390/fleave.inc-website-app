'use client';
import { useDeviceType } from '@/hooks/useDeviceType';
import styles from './Navigation.module.scss';
import { Container } from '../Container/Container';
import Image from 'next/image';
import { NavigationLinks } from './components/NavigationLinks/NavigationLinks';
import { LanguageOptions } from './components/LanguageOptions/LanguageOptions';

export const Navigation = () => {
  const { isDesktop } = useDeviceType();

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
        {isDesktop && <NavigationLinks />}
        <div className={styles.contact_us_language_option}>
          <LanguageOptions />
          {isDesktop && (
            <button type="button" className={styles.contact_us_btn}>
              Contact Us
            </button>
          )}

          {!isDesktop && <NavigationLinks />}
        </div>
      </section>
    </Container>
  );
};
