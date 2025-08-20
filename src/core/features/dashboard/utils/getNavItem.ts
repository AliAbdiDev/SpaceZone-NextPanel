import { NavItem, SidebarConfig } from '../assets/types';

/**
 * Retrieves the main navigation item and its navigation path for the given path.
 * Supports nested sub-items for hierarchical navigation.
 *
 * @param navItems - Array of navigation items defined statically in the frontend.
 * @param currentPath - The current URL path to match against.
 * @returns An object containing the main navigation item (mainNav) and navigation path (navPath) as an array of NavItems.
 * @complexity O(n) for processing navigation items and sub-items, where n is the total number of navigation items and sub-items.
 * @example
 * ```ts
 * const { mainNav, navPath } = getNavItem(navItems, "/home/subitem/subsubitem");
 * ```
 */
export function getNavItem(
    navItems: SidebarConfig['navMain'] | undefined,
    currentPath: string,
): { mainNav: NavItem | null; navPath: NavItem[] } {
    // Default return value if navItems is undefined or empty
    const defaultResult = { mainNav: null, navPath: [] };
    if (!navItems) return defaultResult;

    // Find root navigation item (item with key 'root') for internal logic
    const rootNav = navItems.find((item) => item.key === 'root') || null;

    // Initialize result
    let result: { mainNav: NavItem | null; navPath: NavItem[] } = defaultResult;

    // Recursively process navigation items and their sub-items
    function processNavItems(items: NavItem[], parentPath: NavItem[] = []): boolean {
        for (const item of items) {
            // Skip root navigation item to avoid duplication
            if (item !== rootNav && item.url && item.url === currentPath) {
                result = { mainNav: item, navPath: [...parentPath, item] };
                return true; // Stop processing once a match is found
            }

            // Process sub-items recursively
            if (item.items) {
                if (processNavItems(item.items, [...parentPath, item])) {
                    return true; // Stop if a match is found in sub-items
                }
            }
        }
        return false;
    }

    // Process all top-level navigation items
    processNavItems(navItems);

    // If no match is found and rootNav exists with a URL, use it as fallback
    if (!result.mainNav && rootNav?.url && rootNav.url === currentPath) {
        result = { mainNav: rootNav, navPath: [rootNav] };
    }
    return result;
}