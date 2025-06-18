import { useDeviceType } from '@/lib/hooks/useDeviceType';
import dynamic from 'next/dynamic';
import { DesktopNavigationLinksProps } from './desktop/DesktopNavigationLinks';
import { MobileNavigationLinksProps } from './mobile/MobileNavigationLinks';
import { NAVIGATION_DATA } from '@/lib/data/navigation';

const DesktopNavigationLinks = dynamic<DesktopNavigationLinksProps>(
  () =>
    import('./desktop/DesktopNavigationLinks').then(
      (module) => module.DesktopNavigationLinks
    ),
  {
    ssr: false,
  }
);

const MobileNavigationLinks = dynamic<MobileNavigationLinksProps>(
  () =>
    import('./mobile/MobileNavigationLinks').then(
      (module) => module.MobileNavigationLinks
    ),
  {
    ssr: false,
  }
);

export const NavigationLinks = () => {
  const { isDesktop } = useDeviceType();

  return isDesktop ? (
    <DesktopNavigationLinks navigationLinksData={NAVIGATION_DATA} />
  ) : (
    <MobileNavigationLinks navigationLinksData={NAVIGATION_DATA} />
  );
};
