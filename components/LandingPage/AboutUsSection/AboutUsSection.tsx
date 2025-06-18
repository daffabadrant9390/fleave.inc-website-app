'use client';

import { Button } from '@/components/Button/Button';
import { TitleSectionLayout } from '../TitleSectionLayout/TitleSectionLayout';
import styles from './AboutUsSection.module.scss';
import { ResponsiveImage } from '@/components/ResponsiveImage/ResponsiveImage';
import { useDeviceType } from '@/lib/hooks/useDeviceType';
import { CSSProperties, useEffect, useRef, useState } from 'react';

export const AboutUsSection = () => {
  const { isDesktop } = useDeviceType();
  const [imageYPosition, setImageYPosition] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const getImagePosition = () => {
    if (imageRef.current && sectionRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Calculate position of bottom edge relative to the section
      const bottomY = imageRect.bottom - sectionRect.top;

      setImageYPosition(bottomY);
    }
  };

  useEffect(() => {
    getImagePosition();
    window.addEventListener('scroll', getImagePosition);
    window.addEventListener('resize', getImagePosition);

    return () => {
      window.removeEventListener('scroll', getImagePosition);
      window.removeEventListener('resize', getImagePosition);
    };
  }, []);

  return (
    <section className={styles.about_us_section} ref={sectionRef}>
      <TitleSectionLayout
        title="About Us"
        subtitle="Here's the story of how Fleave.inc came to life—our journey, our vision, and the passion behind everything we create."
      />
      <div className={styles.main_content_wrapper}>
        <div className={styles.description_content}>
          <p className={styles.description_text}>
            Fleave.Inc is an agency engaged in the field of information
            technology, providing various services and digital solutions to
            support your business needs. We are committed to delivering the best
            services by prioritizing innovation, quality, and customer
            satisfaction. With a dedicated team of professionals, Fleave.Inc is
            ready to help you realize innovative and high-quality digital
            solutions. Join us to take your business to the next level!
          </p>
          <Button
            size="regular"
            variant="primary"
            horizontal_padding="default"
            onClick={() => {
              //TODO: Handle the onClick button
              console.log('Clicked!');
            }}
            fullWidth={!isDesktop}
          >
            Read more...
          </Button>
        </div>
        <div className={styles.image_content} ref={imageRef}>
          <ResponsiveImage
            src="/assets/about-us-landing.jpg"
            alt="About Us Landing Page Image"
            fill
            priority
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            withLoader={false} //TODO: Add Loader for better UX like blur image or etc
          />
        </div>
      </div>
      {/* Absolute image */}
      <div className={styles.flower_image_1_wrapper}>
        <ResponsiveImage
          src="/assets/about-us-flower-1.png"
          alt="Flower image BG 1"
          fill
          priority
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          withLoader={false} //TODO: Add Loader for better UX like blur image or etc
        />
      </div>
      <div
        className={styles.flower_image_2_wrapper}
        style={
          {
            '--bottom-y-position-image-content': `${imageYPosition}px`,
          } as CSSProperties
        }
      >
        <ResponsiveImage
          src="/assets/about-us-flower-2.png"
          alt="Flower image BG 2"
          fill
          priority
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          withLoader={false} //TODO: Add Loader for better UX like blur image or etc
        />
      </div>
    </section>
  );
};
