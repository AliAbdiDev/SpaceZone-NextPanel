
import { Sidebar } from "@/core/components/shadcn/ui/sidebar";
export type * from './sidebarConfig';
export type * from './dashboardContext';
export type * from './navData';

export type TSidebar = React.ComponentProps<typeof Sidebar>
export type PathNameMap = Record<string, string>