import {
    LayoutDashboard,
    SquareArrowOutUpLeft,
} from "lucide-react"
import { SidebarConfig } from "../types";
import { createPathBuilder } from "@/core/utils";
import { navMainCertificate, navMainCourse, navMainExercise, navMainRole, navMainStudent, navMainTest, navMainUser } from "./nav-main";
import { systemMenuItemsConfigDashboard } from "./systemMenuItemsConfigDashboard";
import { navSystem } from "./nav-system";

// Defining base paths as constants for better maintainability
export const PATHS = {
    BASE: '/dashboard/admin',
    CERTIFICATE: '/certificate-manage',
    COURSE: '/course-manage',
    EXERCISE: '/exercise-manage',
    ROLE: '/role-manage',
    STUDENT: '/student-manage',
    TEST: '/test-manage',
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
        navMainStudent({ pathFn, basePath: PATHS.STUDENT }),
        navMainRole({ pathFn, basePath: PATHS.ROLE }),
        navMainCourse({ pathFn, basePath: PATHS.COURSE }),
        navMainExercise({ pathFn, basePath: PATHS.EXERCISE }),
        navMainTest({ pathFn, basePath: PATHS.TEST }),
        navMainCertificate({ pathFn, basePath: PATHS.CERTIFICATE }),
        navSystem({ pathFn, basePath: PATHS.SYSTEM }),
        {
            title: "بازگشت به وبسایت",
            url: '/',
            secondaryUrl: PATHS.BASE,
            icon: SquareArrowOutUpLeft,
        }
    ],
}