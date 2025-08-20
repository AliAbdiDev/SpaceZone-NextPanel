import { SystemMenuItem } from "../types";
import { IconsSystemProfile, IconsSystemSettings } from "@/core/assets/icons/stystemIcons";
import { Bell } from "lucide-react";

export const systemMenuItemsConfigDashboard = ({ pathFn }) => [
    {
        label: "تنظیمات",
        icon: IconsSystemSettings.default,
        href: pathFn('/settings'),
        disabled: false,
    },
    {
        label: "اعلان ها",
        icon: Bell,
        href: pathFn('/notifications'),
        disabled: false,
    },
    {
        label: "پروفایل",
        icon: IconsSystemProfile.default,
        href: pathFn('/user-profile'),
        disabled: false,
    }
] as SystemMenuItem[];
