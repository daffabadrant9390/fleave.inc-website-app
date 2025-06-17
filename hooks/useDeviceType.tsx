'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

enum DEVICE_TYPE {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

export type DeviceTypeData = {
  deviceType: DEVICE_TYPE.DESKTOP | DEVICE_TYPE.MOBILE;
  isDesktop: boolean;
  isMobile: boolean;
};

const DEFAULT_VALUE_DEVICE_TYPE_DATA: DeviceTypeData = {
  deviceType: DEVICE_TYPE.DESKTOP,
  isDesktop: true,
  isMobile: false,
};

const DESKTOP_MIN_INNER_WIDTH = 840; // Standard screen size for desktop screen

const generateClientDeviceType = (screenWidth: number) => {
  return screenWidth >= DESKTOP_MIN_INNER_WIDTH
    ? DEVICE_TYPE.DESKTOP
    : DEVICE_TYPE.MOBILE;
};

const DeviceTypeContext = createContext<DeviceTypeData>(
  DEFAULT_VALUE_DEVICE_TYPE_DATA
);

export const DeviceTypeContextProvider = ({
  children,
  isDesktop,
}: {
  children: ReactNode;
  isDesktop: boolean;
}) => {
  const [deviceTypeDataState, setDeviceTypeDataState] =
    useState<DeviceTypeData>(
      isDesktop
        ? { deviceType: DEVICE_TYPE.DESKTOP, isMobile: false, isDesktop: true }
        : { deviceType: DEVICE_TYPE.MOBILE, isMobile: true, isDesktop: false }
    );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;

      const currentWidth =
        document.documentElement.clientWidth || DESKTOP_MIN_INNER_WIDTH;

      const clientDeviceType = generateClientDeviceType(currentWidth);

      setDeviceTypeDataState(
        clientDeviceType === DEVICE_TYPE.DESKTOP
          ? {
              deviceType: DEVICE_TYPE.DESKTOP,
              isDesktop: true,
              isMobile: false,
            }
          : {
              deviceType: DEVICE_TYPE.MOBILE,
              isDesktop: false,
              isMobile: true,
            }
      );
    };

    // Initial check
    if (typeof window !== 'undefined') {
      handleResize();
    }

    // Add both resize and orientationchange listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);

      // Also listen for visualViewport changes if available
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleResize);
        }
      }
    };
  }, []);

  return (
    <DeviceTypeContext.Provider
      value={deviceTypeDataState ?? DEFAULT_VALUE_DEVICE_TYPE_DATA}
    >
      {children}
    </DeviceTypeContext.Provider>
  );
};

export const useDeviceType = () => {
  const deviceTypeData = useContext(DeviceTypeContext);

  if (typeof deviceTypeData?.isDesktop === 'undefined') {
    throw new Error(
      'useDeviceType must be initialized inside DeviceContextProvider!'
    );
  }

  return deviceTypeData;
};
