import { UserRoles } from "@/core/assets/types/entities";
import { LucideIcon, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type IconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
type Items = Array<{
    title: string;
    url: string;
    menuItemDisabled?: boolean
    items?: Items
}>;
export interface NavItem {
    title: string;
    url: string;
    icon?: IconType;
    isActive?: boolean;
    key?: 'root'
    secondaryUrl?: string
    items?: Items
    menuItemDisabled?: boolean
}

export interface SidebarConfig {
    navMain: NavItem[];
    [key: string]: any;
}

export type RoleSwitcherItem = {
    name: string;
    image: string;
    hrefLink: string;
    role: UserRoles
};

export type SystemMenuItem = {
    icon: LucideIcon;
    label: string;
    href?: string;
    disabled?: boolean;
};

export type PathGenerator = (value: string) => string