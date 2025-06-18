'use client';

import { Container } from '@/components/Container/Container';
import { HeroSection } from '@/components/LandingPage/HeroSection/HeroSection';
import { Navigation } from '@/components/Navigation/Navigation';
import { useDeviceType } from '@/lib/hooks/useDeviceType';

import styles from './page.module.scss';
import { AboutUsSection } from '@/components/LandingPage/AboutUsSection/AboutUsSection';

export default function Home() {
  // Get the screen state (desktop or mobile)
  const { isDesktop } = useDeviceType();

  return (
    <main>
      <Navigation />
      <HeroSection />
      <Container className={styles.main_content_section}>
        <AboutUsSection />
      </Container>
    </main>
  );
}
