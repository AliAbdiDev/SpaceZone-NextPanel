
import {
    SquareArrowOutUpLeft,
} from "lucide-react"
import { SidebarConfig } from "../types";
import { createPathBuilder } from "@/core/utils";
import { IconsEntityCourse } from "@/core/assets/icons/entityIcons";
import { IconsSystemDashboard } from "@/core/assets/icons/stystemIcons";
import { systemMenuItemsConfigDashboard } from "./systemMenuItemsConfigDashboard";

// Defining base paths as constants for better maintainability
export const PATHS = {
    BASE: '/dashboard/student',
    CERTIFICATE: '/certificate-manage',
    COURSE: '/course-manage/main',
    EXERCISE: '/exercise-manage',
    ROLE: '/role-manage',
    STUDENT: '/student-manage',
    TEST: '/test-manage',
    USER: '/user-manage/main',
} as const;

const pathFn = createPathBuilder(PATHS.BASE);

/**
 * Configuration for the admin dashboard sidebar.
 * @param pathFn - Function to generate paths relative to the dashboard base.
 * @returns Sidebar configuration object.
 */
export const STUDENT_DASHBOARD_CONFIG: SidebarConfig = {
    systemMenuItems: systemMenuItemsConfigDashboard({ pathFn }),

    navMain: [
        {
            title: "خانه",
            key: 'root',
            url: PATHS.BASE,
            secondaryUrl: PATHS.BASE,
            icon: IconsSystemDashboard.default,
        },
        {
            title: 'لیست دوره ها',
            url: pathFn('/course-student/list'),
            icon: IconsEntityCourse.default,

            items: [

                {
                    menuItemDisabled: true,
                    title: 'پروفایل دوره',
                    url: pathFn('/course-student/profile'),
                }
            ]
        },

        {
            title: "بازگشت به وبسایت",
            url: '/',
            secondaryUrl: PATHS.BASE,
            icon: SquareArrowOutUpLeft,

        }
    ],

}