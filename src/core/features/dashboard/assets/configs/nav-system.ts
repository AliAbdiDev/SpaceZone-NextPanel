import { NavItem, PathGenerator } from "../types"


export const navSystem = ({ pathFn, basePath }: { pathFn: PathGenerator, basePath: string }) => {

    return (
        {
            menuItemDisabled: true,
            title: '',
            url: '',
            items: [
                { title: 'پروفایل کاربری', url: pathFn(`${basePath}/user-profile`) },
                { title: 'تنظیمات داشبورد', url: pathFn(`${basePath}/setting`) },
            ]

        } as NavItem
    )
}