import { UserRoles } from "@/core/assets/types/entities";
import { SidebarConfig } from ".";

export type DashboardContextValue = { sidebarConfig?: SidebarConfig, userRole: UserRoles, };