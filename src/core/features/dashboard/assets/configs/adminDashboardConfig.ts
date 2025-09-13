import {
    LayoutDashboard,
    SquareArrowOutUpLeft,
} from "lucide-react"
import { SidebarConfig } from "../types";
import { createPathBuilder } from "@/core/utils";
import { systemMenuItemsConfigDashboard } from "./systemMenuItemsConfigDashboard";
import { navSystem } from "./nav-system";
import { navMainUser } from "./nav-main/nav-main-user";

// Defining base paths as constants for better maintainability
export const PATHS = {
    BASE: '/panel',
    ROLE: '/role-manage',
    USER: '/user-manage',
    SYSTEM: ''
} as const;

const pathFn = createPathBuilder(PATHS.BASE);

/**
 * Configuration for the admin dashboard sidebar.
 * @param pathFn - Function to generate paths relative to the dashboard base.
 * @returns Sidebar configuration object.
 */
export const ADMIN_DASHBOARD_CONFIG: SidebarConfig = {
    systemMenuItems: systemMenuItemsConfigDashboard({ pathFn }),
    navMain: [
        {
            title: "خانه",
            key: 'root',
            url: PATHS.BASE,
            secondaryUrl: PATHS.BASE,
            icon: LayoutDashboard,
        },
        navMainUser({ pathFn, basePath: PATHS.USER }),

        navSystem({ pathFn, basePath: PATHS.SYSTEM }),
        {
            title: "بازگشت به وبسایت",
            url: '/',
            secondaryUrl: PATHS.BASE,
            icon: SquareArrowOutUpLeft,
        }
    ],
}