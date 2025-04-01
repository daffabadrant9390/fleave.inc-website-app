'use client';

import { Container } from '@/components/Container/Container';
import { useDeviceType } from '@/hooks/useDeviceType';

export default function Home() {
  // Get the screen state (desktop or mobile)
  const { isDesktop } = useDeviceType();

  return (
    <Container>
      <h1 className="text-red-600 font-bold hover:text-blue-600 transition-all duration-150">
        Hello World
      </h1>
    </Container>
  );
}
