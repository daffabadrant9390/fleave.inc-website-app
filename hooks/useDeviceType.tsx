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

const generateClientDeviceType = () => {
  // NOTE: 'desktop' will be used as the fallback value for CSR and
  //        (somehow) inaccesible window?.innerWidth.
  if (typeof window !== 'undefined') {
    const currentScreenWidth = window?.innerWidth || DESKTOP_MIN_INNER_WIDTH;
    return currentScreenWidth >= DESKTOP_MIN_INNER_WIDTH
      ? DEVICE_TYPE.DESKTOP
      : DEVICE_TYPE.MOBILE;
  }

  return DEVICE_TYPE.DESKTOP;
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
  // State for DeviceTypeData
  const [deviceTypeDataState, setDeviceTypeDataState] =
    useState<DeviceTypeData>(
      isDesktop
        ? { deviceType: DEVICE_TYPE.DESKTOP, isMobile: false, isDesktop: true }
        : { deviceType: DEVICE_TYPE.MOBILE, isMobile: true, isDesktop: false }
    );

  useEffect(() => {
    let resizeObserver: ResizeObserver;

    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(([entry]) => {
        if (entry && entry.contentRect && entry.contentRect.width) {
          const clientDeviceType = generateClientDeviceType();

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
        }
      });

      resizeObserver.observe(document.body);

      return () => {
        resizeObserver.unobserve(document.body);
      };
    }
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
