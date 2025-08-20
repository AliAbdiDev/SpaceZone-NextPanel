import { Users2 } from "lucide-react"
import { NavItem, PathGenerator, } from "@/core/features/dashboard/assets/types"

export const navMainUser = ({ pathFn, basePath }: { pathFn: PathGenerator, basePath: string }) => {
    const navUser: NavItem = {
        title: "مدیریت کاربران",
        url: pathFn(`${basePath}`),
        secondaryUrl: pathFn(`${basePath}/list`),
        icon: Users2,
        items: [
            {
                title: "ایجاد کاربر جدید",
                url: pathFn(`${basePath}/create`),
            },
            {
                title: "لیست کاربران",
                url: pathFn(`${basePath}/list`),

            },
            {
                title: 'پروفایل کاربری',
                url: pathFn(`${basePath}/profile`),
                menuItemDisabled: true
            },
            {
                menuItemDisabled: true,
                title: "ویرایش کاربر",
                url: pathFn(`${basePath}/edit`),
            },
        ],
    }

    return navUser
}