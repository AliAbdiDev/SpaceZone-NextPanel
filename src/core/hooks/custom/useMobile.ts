import { useState, useEffect, useCallback, useMemo } from 'react';

/** Interface for device information returned by the hook */
interface DeviceInfo {
  /** Whether the device supports touch input */
  isTouch: boolean;
  /** Screen orientation: 'portrait', 'landscape', or 'unknown' */
  orientation: 'portrait' | 'landscape' | 'unknown';
  /** User agent string of the browser */
  userAgent: string;
  /** Screen width in pixels */
  screenWidth: number;
  /** Screen height in pixels */
  screenHeight: number;
}

/** Interface for the return value of useIsMobile */
interface UseIsMobileReturn extends DeviceInfo {
  /** Whether the device is considered mobile */
  isMobile: boolean;
}

/** Regular expression to detect mobile devices */
const MOBILE_REGEX = /android|iphone|ipad|ipod|webos|blackberry|windows phone/i;

/** Maximum screen width for mobile detection (in pixels) */
const MOBILE_MAX_WIDTH = 640;

/** Default orientation when not detectable */
const DEFAULT_ORIENTATION: DeviceInfo['orientation'] = 'unknown';

/**
 * A custom React hook to detect if the user is on a mobile device and provide additional device information.
 * Optimized to minimize unnecessary re-renders by using separate states and moving static logic outside the hook.
 * @returns An object containing mobile detection status and device information such as touch support, orientation, and screen dimensions.
 * @example
 * ```tsx
 * const { isMobile, isTouch, orientation, screenWidth, screenHeight } = useIsMobile();
 * console.log(isMobile); // true if on a mobile device
 * ```
 */
const useMobile = (): UseIsMobileReturn => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<DeviceInfo['orientation']>(DEFAULT_ORIENTATION);
  const [userAgent, setUserAgent] = useState<string>('');
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);

  // Memoized function to check mobile status and device info
  const checkIsMobile = useCallback(() => {
    const userAgentValue = navigator.userAgent || '';
    const isMobileDevice = MOBILE_REGEX.test(userAgentValue);
    const isTouchSupported = 'ontouchstart' in window || navigator?.maxTouchPoints > 0;
    const orientationValue = window.screen?.orientation?.type || DEFAULT_ORIENTATION;
    const screenWidthValue = window.innerWidth || document.documentElement.clientWidth || 0;
    const screenHeightValue = window.innerHeight || document.documentElement.clientHeight || 0;

    // Only update state if values have changed
    setIsMobile((prev) => (prev !== (isMobileDevice || screenWidthValue <= MOBILE_MAX_WIDTH) ? isMobileDevice || screenWidthValue <= MOBILE_MAX_WIDTH : prev));
    setIsTouch((prev) => (prev !== isTouchSupported ? isTouchSupported : prev));
    setOrientation((prev) => (prev !== orientationValue ? (orientationValue as DeviceInfo['orientation']) : prev));
    setUserAgent((prev) => (prev !== userAgentValue ? userAgentValue : prev));
    setScreenWidth((prev) => (prev !== screenWidthValue ? screenWidthValue : prev));
    setScreenHeight((prev) => (prev !== screenHeightValue ? screenHeightValue : prev));
  }, []);

  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    window.addEventListener('orientationchange', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('orientationchange', checkIsMobile);
    };
  }, [checkIsMobile]);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      isMobile,
      isTouch,
      orientation,
      userAgent,
      screenWidth,
      screenHeight,
    }),
    [isMobile, isTouch, orientation, userAgent, screenWidth, screenHeight]
  );
};

export default useMobile;