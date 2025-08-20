// Icons used for general/system-level sections of the application
// These are not related to entities (e.g., dashboard, settings, notifications, etc.)

import { LayoutDashboard, PlusCircle, Settings, UserRoundCog } from "lucide-react";
import { CommonIcon } from "../types";
import { CommonIconEdit } from "./commonIcons";

const IconsSystemDashboard: CommonIcon = {
    default: LayoutDashboard,
};

const IconsSystemSettings: CommonIcon = {
    default: Settings,
    create: PlusCircle,
    edit: CommonIconEdit,
};
const IconsSystemProfile: CommonIcon = {
    default: UserRoundCog,
};

export {
    IconsSystemDashboard,
    IconsSystemSettings,
    IconsSystemProfile,
}