import { NavigationMenuLink } from "@/core/components/shadcn/ui/navigation-menu";
import { ReactNode } from "react";

export interface naviagtionHeader {
    href?: string;
    label: ReactNode;
    active?: boolean;
    disabled?: boolean
    propertys?: Omit<React.ComponentProps<typeof NavigationMenuLink>, 'href' | 'className' | "active">
}