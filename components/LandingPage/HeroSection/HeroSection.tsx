import { useDeviceType } from '@/lib/hooks/useDeviceType';
import styles from './HeroSection.module.scss';
import Image from 'next/image';
import { ResponsiveImage } from '@/components/ResponsiveImage/ResponsiveImage';
import { TitleSection } from './TitleSection';
import { Button } from '@/components/Button/Button';

export const HeroSection = () => {
  const { isDesktop } = useDeviceType();

  return (
    <section className={styles.hero_section}>
      {/* Banner Image */}
      <div className={styles.banner_hero}>
        <ResponsiveImage
          alt="Hero Banner Image"
          fill
          priority
          src="/assets/hero-image-banner.jpg"
          sizes="100vw"
          style={{ objectFit: 'cover', filter: 'brightness(50%)' }}
          withLoader={false} //TODO: Add Loader for better UX like blur image or etc
        />
      </div>

      <div className={styles.hero_content_section}>
        <TitleSection />
        <div className={styles.buttons_content_wrapper}>
          <Button variant="secondary" size="large" horizontal_padding="default">
            Get Started
          </Button>
          <Button variant="tertiary" size="large" horizontal_padding="default">
            Let's Collaborate
          </Button>
        </div>
      </div>
    </section>
  );
};
