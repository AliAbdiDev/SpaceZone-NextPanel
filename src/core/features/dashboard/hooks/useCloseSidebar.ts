'use client';

import { SidebarContext } from "@/core/components/shadcn/ui/sidebar";
import { useHelperContext } from "@/core/hooks/custom";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useCloseSidebar() {
    const currentPath = usePathname();
    const { isMobile, setOpenMobile } = useHelperContext({
        context: SidebarContext,
        contextName: 'SidebarContext'
    });

    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false);
        }
    }, [currentPath, isMobile, setOpenMobile]);
}
