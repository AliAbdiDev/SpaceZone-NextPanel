'use client';
import { useEffect, useState, useMemo } from 'react';
import { NavData, SidebarConfig } from '../assets/types';
import { getNavItem } from '../utils';
import { usePathname } from 'next/navigation';
import { validateNonEmptyArray } from '@/core/utils';

/**
 * A custom hook to derive navigation data from the current route and sidebar main items.
 * Keeps navigation state in sync without redundant re-renders.
 *
 * @param navMain - An array of primary sidebar navigation items (SidebarConfig['navMain']).
 * @returns The navigation data object:
 *   - mainNav: The main navigation item or null.
 *   - navPath: Full breadcrumb path as an array of NavItem.
 * @complexity O(n) for processing navigation items in getNavItem, where n is the total number of navigation items and sub-items.
 * @example
 * ```tsx
 * const { mainNav, navPath } = useNavData(sidebarConfig.navMain);
 * // Use these values to render breadcrumbs or sidebars
 * ```
 */
export function useNavData(navMain: SidebarConfig['navMain'] | null): NavData {
    const currentPath = usePathname();
    const [navData, setNavData] = useState<NavData>({
        mainNav: null,
        navPath: [],
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !currentPath) {
            return;
        }

        if (!validateNonEmptyArray(navMain)) {
            setNavData((prevNavData) => {
                if (prevNavData.mainNav === null && prevNavData.navPath.length === 0) {
                    return prevNavData;
                }
                return { mainNav: null, navPath: [] };
            });
            return;
        }

        const newNavData = getNavItem(navMain, currentPath);

        // Perform deep comparison to avoid unnecessary updates
        setNavData((prevNavData) => {
            const isMainNavEqual =
                (!prevNavData.mainNav && !newNavData.mainNav) ||
                (prevNavData.mainNav?.url === newNavData.mainNav?.url &&
                    prevNavData.mainNav?.key === newNavData.mainNav?.key);

            const isNavPathEqual =
                prevNavData.navPath.length === newNavData.navPath.length &&
                prevNavData.navPath.every((item, index) => item.url === newNavData.navPath[index]?.url &&
                    item.key === newNavData.navPath[index]?.key);

            if (isMainNavEqual && isNavPathEqual) {
                return prevNavData; // Return previous state to prevent re-render
            }

            return newNavData;
        });
    }, [navMain, currentPath, isMounted]);

    // Memoize the returned navData to ensure reference stability
    return useMemo(() => navData, [navData]);
}