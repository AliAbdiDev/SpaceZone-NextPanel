interface NavigatorExtended extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    addEventListener: (type: string, listener: () => void) => void;
    removeEventListener: (type: string, listener: () => void) => void;
  };
  getBattery?: () => Promise<{
    level: number;
    charging: boolean;
  }>;
}

interface UseIsResourceLimitedReturn {
  /** Whether the device's resources are considered limited */
  isResourceLimited: boolean;
  /** Battery level as a fraction (0 to 1), or null if not available */
  batteryLevel: number | null;
  /** Device memory in GB, or null if not available */
  deviceMemory: number | null;
  /** Number of CPU cores, or null if not available */
  cpuCores: number | null;
  /** Estimated CPU usage as a fraction (0 to 1), or null if not measurable */
  cpuUsage: number | null;
}

/** Constants for resource checks */
const MIN_CPU_CORES = 2;
const MIN_DEVICE_MEMORY = 2;
const MIN_BATTERY_LEVEL = 0.2;
const LIMITED_NETWORK_TYPES = ['slow-2g', '2g'];
const DEFAULT_CPU_CORES = 4;
const DEFAULT_DEVICE_MEMORY = 4;

const checkCpuLimitations = (
  nav: NavigatorExtended
): {
  isCpuLimited: boolean;
  cpuCores: number | null;
  cpuUsage: number | null;
} => {
  let isCpuLimited = false;
  let cpuUsage: number | null = null;

  // Check CPU cores
  const cpuCores = nav.hardwareConcurrency || DEFAULT_CPU_CORES;
  if (cpuCores <= MIN_CPU_CORES) {
    isCpuLimited = true;
  }

  // Estimate CPU usage
  try {
    const start = performance.now();
    // Simulate a small CPU-intensive task
    for (let i = 0; i < 1e6; i++) {
      Math.sqrt(i);
    }
    const end = performance.now();
    // Normalize to a value between 0 and 1 (higher duration = higher CPU usage)
    cpuUsage = Math.min((end - start) / 100, 1);
  } catch (error) {
    console.warn('Error estimating CPU usage:', error);
  }

  return { isCpuLimited, cpuCores, cpuUsage };
};

const checkMemoryLimitations = (
  nav: NavigatorExtended
): {
  isMemoryLimited: boolean;
  deviceMemory: number | null;
} => {
  let isMemoryLimited = false;
  const deviceMemory = 'deviceMemory' in nav ? nav.deviceMemory || DEFAULT_DEVICE_MEMORY : null;
  if (deviceMemory && deviceMemory <= MIN_DEVICE_MEMORY) {
    isMemoryLimited = true;
  }
  return { isMemoryLimited, deviceMemory };
};

const checkBatteryLimitations = async (
  nav: NavigatorExtended
): Promise<{
  isBatteryLimited: boolean;
  batteryLevel: number | null;
}> => {
  let isBatteryLimited = false;
  let batteryLevel: number | null = null;

  if ('getBattery' in nav) {
    try {
      const battery = await nav.getBattery!();
      batteryLevel = battery.level;
      if (battery.level <= MIN_BATTERY_LEVEL && !battery.charging) {
        isBatteryLimited = true;
      }
    } catch (error) {
      console.warn('Error checking battery:', error);
    }
  }

  return { isBatteryLimited, batteryLevel };
};

const checkNetworkLimitations = (
  nav: NavigatorExtended
): {
  isNetworkLimited: boolean;
} => {
  let isNetworkLimited = false;
  if (nav.connection?.effectiveType && LIMITED_NETWORK_TYPES.includes(nav.connection.effectiveType)) {
    isNetworkLimited = true;
  }
  return { isNetworkLimited };
};

import { useState, useEffect, useCallback, useMemo } from 'react';
/**
 * A custom React hook to detect if the user's device has limited resources and provide detailed resource information.
 * Optimized by moving static logic and related checks into separate modules outside the hook.
 * @returns An object containing whether the device's resources are limited, battery level, memory usage, CPU cores, and CPU usage.
 * @example
 * ```tsx
 * const { isResourceLimited, batteryLevel, deviceMemory, cpuCores, cpuUsage } = useIsResourceLimited();
 * console.log(isResourceLimited); // true if resources are limited
 * console.log(batteryLevel); // e.g., 0.85 (85% battery)
 *
 * ```
 */
const useResourceLimited = (): UseIsResourceLimitedReturn => {
  const [isResourceLimited, setIsResourceLimited] = useState<boolean>(false);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [deviceMemory, setDeviceMemory] = useState<number | null>(null);
  const [cpuCores, setCpuCores] = useState<number | null>(null);
  const [cpuUsage, setCpuUsage] = useState<number | null>(null);

  const checkResources = useCallback(async () => {
    const nav = navigator as NavigatorExtended;

    const { isCpuLimited, cpuCores, cpuUsage } = checkCpuLimitations(nav);
    const { isMemoryLimited, deviceMemory } = checkMemoryLimitations(nav);
    const { isBatteryLimited, batteryLevel } = await checkBatteryLimitations(nav);
    const { isNetworkLimited } = checkNetworkLimitations(nav);

    const isLimited = isCpuLimited || isMemoryLimited || isBatteryLimited || isNetworkLimited;

    setIsResourceLimited((prev) => (prev !== isLimited ? isLimited : prev));
    setBatteryLevel((prev) => (prev !== batteryLevel ? batteryLevel : prev));
    setDeviceMemory((prev) => (prev !== deviceMemory ? deviceMemory : prev));
    setCpuCores((prev) => (prev !== cpuCores ? cpuCores : prev));
    setCpuUsage((prev) => (prev !== cpuUsage ? cpuUsage : prev));
  }, []);

  useEffect(() => {
    checkResources();

    const connection = (navigator as NavigatorExtended).connection;
    if (connection) {
      connection.addEventListener('change', checkResources);
      return () => connection.removeEventListener('change', checkResources);
    }
  }, [checkResources]);

  return useMemo(
    () => ({
      isResourceLimited,
      batteryLevel,
      deviceMemory,
      cpuCores,
      cpuUsage,
    }),
    [isResourceLimited, batteryLevel, deviceMemory, cpuCores, cpuUsage]
  );
};

export default useResourceLimited;
